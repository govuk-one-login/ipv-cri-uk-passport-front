const axios = require("axios");
const {
  API_BASE_URL,
  API_INITIALISE_SESSION_REQ_PATH,
} = require("../../lib/config");
const { redirectOnError } = require("../shared/oauth");
const logger = require("hmpo-logger").get();

module.exports = {
  decryptJWTAuthorizeRequest: async (req, res, next) => {
    const requestJWT = req.query?.request;
    const headers = {
      client_id: req.query?.client_id,
    };

    if (!requestJWT) {
      return next(new Error("JWT Missing"));
    }

    try {
      const apiResponse = await axios.post(
        `${API_BASE_URL}${API_INITIALISE_SESSION_REQ_PATH}`,
        requestJWT,
        { headers: headers }
      );
      logger.info("response received from JWT authorize lambda", { req, res });

      let { passportSessionId, shared_claims } = apiResponse.data;

      req.session.shared_claims = shared_claims;
      req.session.passportSessionId = passportSessionId;

      return next();
    } catch (error) {
      logger.error("error calling JWT authorize lambda", { req, res });
      return redirectOnError(error, res, next);
    }
  },

  redirectToPassportDetailsPage: async (req, res) => {
    logger.info("redirecting to passport details page", { req, res });
    res.redirect("/passport");
  },

  redirectToCallback: async (req, res) => {
    const redirectUrl =
      req.session["hmpo-wizard-cri-passport-front"].redirect_url;
    res.redirect(redirectUrl.toString());
  },
};
