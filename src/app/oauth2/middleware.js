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

  redirectToPassportDetailsPage: async (req, res) => {
    res.redirect("/passport");
  },

  redirectToCallback: async (req, res) => {
    const redirectURL = `${req.session.authParams.redirect_uri}?code=${req.authorization_code}`;

    res.redirect(redirectURL);
  },
};
