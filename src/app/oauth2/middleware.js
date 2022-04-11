const axios = require("axios");
const {
  API_BASE_URL,
  API_SHARED_ATTRIBUTES_PATH,
} = require("../../lib/config");

module.exports = {
  addAuthParamsToSession: async (req, res, next) => {
    const authParams = {
      response_type: req.query.response_type,
      client_id: req.query.client_id,
      state: req.query.state,
      redirect_uri: req.query.redirect_uri,
    };

    req.session.authParams = authParams;

    next();
  },

  parseSharedAttributesJWT: async (req, res, next) => {
    const requestJWT = req.query?.request;
    const headers = { client_id: req.query?.client_id };

    try {
      if (requestJWT) {
        const apiResponse = await axios.post(
          `${API_BASE_URL}${API_SHARED_ATTRIBUTES_PATH}`,
          requestJWT,
          { headers: headers }
        );
        req.session.sharedAttributes = apiResponse?.data;
      }
      next();
    } catch (error) {
      next(error);
    }
  },

  redirectToPassportDetailsPage: async (req, res) => {
    res.redirect("/passport");
  },

  redirectToCallback: async (req, res) => {
    const authCode =
      req.session["hmpo-wizard-cri-passport-front"].authorization_code;
    const redirectUrl = new URL(decodeURIComponent(req.session.authParams.redirect_uri))
    if (authCode) {
      redirectUrl.searchParams.append('code', authCode)
      if (req.session.authParams.state) {
        redirectUrl.searchParams.append('state', req.session.authParams.state)
      }

      res.redirect(redirectUrl.href);
    } else {
      const error = req.session["hmpo-wizard-cri-passport-front"].error;
      const errorCode = error?.code;
      const errorDescription = error?.description ?? error?.message;
      redirectUrl.searchParams.append('error', errorCode)
      redirectUrl.searchParams.append('error_description', errorDescription)
      res.redirect(redirectUrl.href);
    }
  },
};
