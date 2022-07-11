const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;

const DateController = DateControllerMixin(BaseController);

class PassportDetailsController extends DateController {
  async saveValues(req, res, callback) {
    super.saveValues(req, res, () => {
      req.sessionModel.set("showRetryMessage", false);
      callback();
    });
  }
}
module.exports = PassportDetailsController;
