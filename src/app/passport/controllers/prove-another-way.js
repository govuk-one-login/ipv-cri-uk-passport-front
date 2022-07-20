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
      const action = req.form.values.proveAnotherWayRadio;

      const headers = {
        passport_session_id: req.session.passportSessionId,
      };

      switch (action) {
        case "proveAnotherWay": {
          logger.info(
            "user selected prove another way : calling build-client-oauth-response lambda",
            { req, res }
          );
          const apiResponse = await axios.post(
            `${API_BASE_URL}${API_BUILD_CLIENT_OAUTH_RESPONSE_PATH}`,
            undefined,
            { headers: headers }
          );

          const redirect_url = apiResponse?.data?.client?.redirectUrl;
          req.sessionModel.set("redirect_url", redirect_url);
          super.saveValues(req, res);
          return "/oauth2/callback";
        }
        case "retry": {
          logger.info("user selected retry : redirecting to passport details", {
            req,
            res,
          });
          return next();
        }
      }
    } catch (err) {
      if (err) {
        return next(err);
      }
    }
  }
}

module.exports = ProveAnotherWayController;
