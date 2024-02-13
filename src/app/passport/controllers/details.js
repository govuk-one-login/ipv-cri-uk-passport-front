const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;

const DateController = DateControllerMixin(BaseController);

class PassportDetailsController extends DateController {
  _padYear(value, offset) {

    return value;
  }
}
module.exports = PassportDetailsController;
