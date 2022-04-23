module.exports = {
  redirectOnAuthError: (error, res, next) => {
    if (error.response && error.response.data.redirect_uri) {
      const errorData = error.response.data;
      const redirectUrl = new URL(decodeURIComponent(errorData.redirect_uri));
      if (errorData?.code) redirectUrl.searchParams.append('error', errorData.code)
      if (errorData?.description) redirectUrl.searchParams.append('error_description', errorData.description)

      return res.redirect(redirectUrl.href);
    }
    return next(error)
  }
}
