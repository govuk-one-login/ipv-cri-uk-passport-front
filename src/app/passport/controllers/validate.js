const axios = require("axios");
const BaseController = require("hmpo-form-wizard").Controller;

const { API_BASE_URL, API_VALIDATE_PASSPORT_PATH } = require("../../../lib/config");

class ValidateController extends BaseController {
  async saveValues(req, res, next) {
    const attributes = {
      passportNumber: req.sessionModel.get("passportNumber"),
      surname: req.sessionModel.get("surname"),
      forenames: req.sessionModel.get("givenNames").split(' '),
      dateOfBirth: req.sessionModel.get("dateOfBirth"),
      expiryDate: req.sessionModel.get("expiryDate"),
    };

    try {
      const oauthParams = {
        ...req.session.authParams,
        scope: "openid",
      };

      const queryParams = this.getQueryStringParams(oauthParams);
      const apiResponse = await axios.post(`${API_BASE_URL}${API_VALIDATE_PASSPORT_PATH}${queryParams}`, attributes);

      const code = apiResponse?.data?.code?.value;

      if (!code) {
        res.status(500);
        return res.send("Missing authorization code");
      }

      req.session.authorization_code = code;

      super.saveValues(req, res, next);
    } catch (error) {
      res.error = error.name;
      return next(error);
    }
  }

  getQueryStringParams(authParams) {
    return '?' + Object.keys(authParams).map(key => key + '=' + authParams[key]).join('&');
  }
}

module.exports = ValidateController;
