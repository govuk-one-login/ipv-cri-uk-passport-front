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
      passport_session_id: req.session.id,
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

      let { passportSessionId, ...JWTData } = apiResponse.data;

      req.session.JWTData = JWTData;
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
    const authCode =
      req.session["hmpo-wizard-cri-passport-front"].authorization_code;
    const { authParams } = req.session.JWTData;
    const redirectUrl = new URL(decodeURIComponent(authParams.redirect_uri));
    if (authCode) {
      redirectUrl.searchParams.append("code", authCode);
      if (authParams.state) {
        redirectUrl.searchParams.append("state", authParams.state);
      }

      res.redirect(redirectUrl.href);
    } else {
      logger.error("auth code not received in callback", { req, res });
      const error = req.session["hmpo-wizard-cri-passport-front"].error;
      const errorCode = error?.error ?? "unknown";
      const errorDescription = error?.error_description ?? error?.message;
      redirectUrl.searchParams.append("error", errorCode);
      redirectUrl.searchParams.append("error_description", errorDescription);
      if (authParams.state) {
        redirectUrl.searchParams.append("state", authParams.state);
      }
      res.redirect(redirectUrl.href);
    }
  },
};
