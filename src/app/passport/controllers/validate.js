const axios = require("axios");
const BaseController = require("hmpo-form-wizard").Controller;

const {
  API: {
    BASE_URL,
    PATHS: { CHECK }
  }
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
      expiryDate: req.sessionModel.get("expiryDate")
    };

    try {
      const headers = {
        session_id: req.session.tokenId
      };

      if (req.session.featureSet === "hmpoDVAD") {
        headers["document-checking-route"] = "dvad";
      }

      logger.info("validate: calling check-passport lambda", { req, res });
      const checkPassportResponse = await axios.post(
        `${BASE_URL}${CHECK}`,
        attributes,
        { headers: headers }
      );

      if (checkPassportResponse.data?.result === "retry") {
        logger.info("validate: passport retry", { req, res });
        req.sessionModel.set("showRetryMessage", true);
      } else {
        req.session.authParams.redirect_uri =
          checkPassportResponse.data.redirect_uri;
        req.session.authParams.state = checkPassportResponse.data.state;

        logger.info("Validate: redirecting user to callBack with url ", {
          req,
          res
        });
      }

      callback();
    } catch (err) {
      let message = "error thrown in validate controller";

      if (
        !req.session.authParams?.state ||
        !req.session.authParams?.redirect_uri
      ) {
        message = "Failed to retrieve authorization redirect_uri or state";
      }

      super.saveValues(req, res, () => {
        logger.error(message, { req, res, err });

        const error = {
          error: "server_error",
          error_description: message
        };
        req.sessionModel.set("error", error);
        callback(err);
      });
    }
  }
}

module.exports = ValidateController;
