const axios = require("axios");
const BaseController = require("hmpo-form-wizard").Controller;

const { API_BASE_URL, API_VALIDATE_PASSPORT_PATH } = require("../../lib/config");

class DoneController extends BaseController {
  async saveValues(req, res, next) {
    const attributes = {
      passportNumber: req.sessionModel.get("passportNumber"),
      surname: req.sessionModel.get("surname"),
      forenames: [req.sessionModel.get("givenNames")],
      dateOfBirth: req.sessionModel.get("dateOfBirth"),
      expiryDate: req.sessionModel.get("expiryDate"),
    };

    try {
      const response = await axios.post(`${API_BASE_URL}${API_VALIDATE_PASSPORT_PATH}`, attributes);
    } catch (error) {
      res.error = error.name;
      return next(error);
    }

    super.saveValues(req, res, next);
  }
}

module.exports = DoneController;
