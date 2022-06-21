module.exports = {
  redirectOnError: (error, res, next) => {
    if (error.response && error.response.data.redirect_uri) {
      const errorData = error.response.data;
      const redirectUrl = new URL(decodeURIComponent(errorData.redirect_uri));
      const oauthError = errorData.oauth_error;
      if (oauthError?.error)
        redirectUrl.searchParams.append("error", oauthError.error);
      if (oauthError?.error_description)
        redirectUrl.searchParams.append(
          "error_description",
          oauthError.error_description
        );
      if (oauthError?.state)
        redirectUrl.searchParams.append('state', oauthError.state)

      return res.redirect(redirectUrl.href);
    }
    return next(error);
  },
};
