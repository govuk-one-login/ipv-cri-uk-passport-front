const {Controller: BaseController} = require("hmpo-form-wizard");

class RootController extends BaseController {
  async saveValues(req, res, next) {
    const sharedAttributes = req.session.sharedAttributes;
    if (sharedAttributes) {
      if (sharedAttributes?.names?.length > 0) {
        req.journeyModel.set("surname", sharedAttributes.names[0]?.familyName)
        req.journeyModel.set("givenNames", sharedAttributes.names[0]?.givenNames)
      }

      if (sharedAttributes?.dateOfBirths?.length > 0) {
        req.journeyModel.set("dateOfBirth", sharedAttributes.dateOfBirths[0])
      }
    }
    super.saveValues(req, res, next);
  }
}

module.exports = RootController;
