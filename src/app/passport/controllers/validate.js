const axios = require("axios");
const BaseController = require("hmpo-form-wizard").Controller;

const { API_BASE_URL, API_AUTHORIZE_PATH } = require("../../../lib/config");
const logger = require("hmpo-logger").get();

class ValidateController extends BaseController {
  async saveValues(req, res, next) {
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
        passport_session_id: req.session.id,
      };

      logger.info("calling authorize lambda", { req, res });
      const apiResponse = await axios.post(
        `${API_BASE_URL}${API_AUTHORIZE_PATH}${queryParams}`,
        attributes,
        { headers: headers }
      );

      const code = apiResponse?.data?.code?.value;

      super.saveValues(req, res, () => {
        if (!code) {
          const error = {
            error: "server_error",
            error_description: "Failed to retrieve authorization code",
          };
          req.sessionModel.set("error", error);
          next();
        } else {
          req.sessionModel.set("authorization_code", code);
          next();
        }
      });
    } catch (error) {
      logger.error("error thrown in validate controller", { req, res, error });
      super.saveValues(req, res, () => {
        req.sessionModel.set("error", error.response.data);
        next();
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
}

module.exports = ValidateController;
