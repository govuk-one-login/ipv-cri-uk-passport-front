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
      const headers = {
        passport_session_id: req.session.passportSessionId,
      };

      logger.info("calling check-passport lambda", { req, res });
      const checkPassportResponse = await axios.post(
        `${API_BASE_URL}${API_CHECK_PASSPORT_PATH}`,
        attributes,
        { headers: headers }
      );

      if (checkPassportResponse.data?.result === "retry") {
        logger.info("passport retry", { req, res });
        req.sessionModel.set("showRetryMessage", true);
        return callback();
      }

      logger.info("calling build-client-oauth-response lambda", { req, res });
      const apiResponse = await axios.post(
        `${API_BASE_URL}${API_BUILD_CLIENT_OAUTH_RESPONSE_PATH}`,
        undefined,
        { headers: headers }
      );

      const redirect_url = apiResponse?.data?.client?.redirectUrl;

      super.saveValues(req, res, () => {
        if (!redirect_url) {
          const error = {
            error: "server_error",
            error_description: "Failed to retrieve authorization redirect url",
          };
          req.sessionModel.set("error", error);
          callback();
        } else {
          req.sessionModel.set("redirect_url", redirect_url);
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

  next(req) {
    if (req.sessionModel.get("showRetryMessage")) {
      return "details";
    } else {
      return "/oauth2/callback";
    }
  }
}

module.exports = ValidateController;
