const axios = require("axios");
const BaseController = require("hmpo-form-wizard").Controller;

const { API_BASE_URL, API_VALIDATE_PASSPORT_PATH } = require("../../lib/config");

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
      await axios.post(`${API_BASE_URL}${API_VALIDATE_PASSPORT_PATH}`, attributes);

      //TODO: get these values from response when ready
      req.session.passportParams = {
        authorizationCode: "THIS-IS-A-FAKE-AUTH-CODE!!!!!!",
        isValid: true
      };

      super.saveValues(req, res, next);
    } catch (error) {
      res.error = error.name;
      return next(error);
    }
  }
}

module.exports = ValidateController;