const axios = require("axios");
const BaseController = require("hmpo-form-wizard").Controller;

const {
  API_BASE_URL,
  API_CHECK_PASSPORT_PATH,
  API_BUILD_CLIENT_OAUTH_RESPONSE_PATH,
} = require("../../../lib/config");
const logger = require("hmpo-logger").get();

class ValidateController extends BaseController {
  async saveValues(req, res, callback) {
    req.sessionModel.set("showRetryMessage", false);
    const firstName = req.sessionModel.get("firstName");
    const middleNames = req.sessionModel.get("middleNames");
    const forenames =
      middleNames === ""
        ? firstName.split(" ")
        : firstName.split(" ").concat(middleNames.split(" "));
    const attributes = {
      passportNumber: req.sessionModel.get("passportNumber"),
      surname: req.sessionModel.get("surname"),
      forenames: forenames,
      dateOfBirth: req.sessionModel.get("dateOfBirth"),
      expiryDate: req.sessionModel.get("expiryDate"),
    };

    try {
      const oauthParams = {
        ...req.session.JWTData.authParams,
        scope: "openid",
      };

      const queryParams = this.getQueryStringParams(oauthParams);

      const headers = {
        user_id: req.session.JWTData?.user_id,
        passport_session_id: req.session.passportSessionId,
      };

      logger.info("calling check-passport lambda", { req, res });
      const checkPassportResponse = await axios.post(
        `${API_BASE_URL}${API_CHECK_PASSPORT_PATH}${queryParams}`,
        attributes,
        { headers: headers }
      );
      req.sessionModel.passportResponseStatus =
        checkPassportResponse.data?.result;
      if (checkPassportResponse.data?.result === "retry") {
        req.session.passportResponseStatus = "retry";
        return callback();
      }

      logger.info("calling build-client-oauth-response lambda", { req, res });
      const apiResponse = await axios.post(
        `${API_BASE_URL}${API_BUILD_CLIENT_OAUTH_RESPONSE_PATH}`,
        undefined,
        { headers: { passport_session_id: req.session.passportSessionId } }
      );

      const code = apiResponse?.data?.code?.value;

      super.saveValues(req, res, () => {
        if (!code) {
          const error = {
            error: "server_error",
            error_description: "Failed to retrieve authorization code",
          };
          req.sessionModel.set("error", error);
          callback();
        } else {
          req.sessionModel.set("authorization_code", code);
          callback();
        }
      });
    } catch (error) {
      logger.error("error thrown in validate controller", { req, res, error });
      super.saveValues(req, res, () => {
        req.sessionModel.set("error", error.response.data);
        callback();
      });
    }
  }

  getQueryStringParams(authParams) {
    return (
      "?" +
      Object.keys(authParams)
        .map((key) => key + "=" + authParams[key])
        .join("&")
    );
  }

  next(req) {
    const passportResponseStatus = req.session.passportResponseStatus;

    if (passportResponseStatus === "retry") {
      logger.info("Next is retry");
      req.sessionModel.set("showRetryMessage", true);
      return "details";
    } else {
      logger.info("Next is callback");
      return "/oauth2/callback";
    }
  }
}

module.exports = ValidateController;
