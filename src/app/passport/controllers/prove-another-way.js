const BaseController = require("hmpo-form-wizard").Controller;
const axios = require("axios");
const logger = require("hmpo-logger").get();

const {
  API_BUILD_CLIENT_OAUTH_RESPONSE_PATH,
  API_BASE_URL,
} = require("../../../lib/config");

class ProveAnotherWayController extends BaseController {
  async saveValues(req, res, next) {
    try {
      logger.info("user submitting prove another way", { req, res });
      req.sessionModel.set("redirect_url", undefined);

      const action = req.form.values.proveAnotherWayRadio;

      const headers = {
        passport_session_id: req.session.passportSessionId,
      };

      switch (action) {
        case "proveAnotherWay": {
          logger.info(
            "prove-another-way: user selected proveAnotherWay - calling build-client-oauth-response lambda",
            { req, res }
          );
          const apiResponse = await axios.post(
            `${API_BASE_URL}${API_BUILD_CLIENT_OAUTH_RESPONSE_PATH}`,
            undefined,
            { headers: headers }
          );
          logger.info(
            "prove another way: redirecting user to callBack " +
              apiResponse?.data?.client?.redirectUrl,
            {
              req,
              res,
            }
          );
          const redirect_url = apiResponse?.data?.client?.redirectUrl;
          req.sessionModel.set("redirect_url", redirect_url);
          return next();
        }
        case "retry": {
          logger.info(
            "prove-another-way: user selected retry : redirecting to passport details",
            {
              req,
              res,
            }
          );
          return next();
        }
      }
      return next(new Error("prove-another-way: Invalid action " + action));
    } catch (err) {
      return next(err);
    }
  }

  next(req) {
    if (req.sessionModel.get("redirect_url")) {
      return "/oauth2/callback";
    } else {
      return "/passport/details";
    }
  }
}

module.exports = ProveAnotherWayController;
