const axios = require("axios");
const {API_BASE_URL, API_JWT_VERIFICATION_PATH} = require("../../lib/config");

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
    const requestJWT = req.query.request;
    const headers = { 'client_id': req.session?.authParams?.client_id };

    if (requestJWT) {
      const apiResponse = await axios.post(`${API_BASE_URL}${API_JWT_VERIFICATION_PATH}`, requestJWT, {headers: headers});
      req.sessionModel.set(apiResponse?.data);
    }
    next();
  },

  redirectToPassportDetailsPage: async (req, res) => {
    res.redirect("/passport");
  },

  redirectToCallback: async (req, res) => {
    const redirectURL = `${req.session.authParams.redirect_uri}&code=${req.session.authorization_code}`;

    res.redirect(redirectURL);
  },
};
