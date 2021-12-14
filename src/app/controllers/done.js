const BaseController = require("hmpo-form-wizard").Controller;

class DoneController extends BaseController {
  async saveValues(req, res, next) {
    const attributes = {
      passportNumber: req.sessionModel.get("passportNumber"),
      surname: req.sessionModel.get("surname"),
      forenames: req.sessionModel.get("givenNames"),
      dateOfBirth: req.sessionModel.get("dateOfBirth"),
      issueDate: req.sessionModel.get("issueDate"),
      expiryDate: req.sessionModel.get("expiryDate"),
    };

    // eslint-disable-next-line no-console
    console.log(JSON.stringify(attributes, null, 2));

    super.saveValues(req, res, next);
  }
}

module.exports = DoneController;
