const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;

const DateController = DateControllerMixin(BaseController);

const logger = require("hmpo-logger").get();

class PassportDetailsController extends DateController {
  _padYear(value, offset) {
    logger.info("offset value of {} ignored as no padding is applied", offset);
    return value;
  }
  async saveValues(req, res, callback) {
    super.saveValues(req, res, () => {
      req.sessionModel.set("showRetryMessage", false);
      callback();
    });
  }
}
module.exports = PassportDetailsController;
