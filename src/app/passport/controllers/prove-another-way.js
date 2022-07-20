const BaseController = require("hmpo-form-wizard").Controller;

class ProveAnotherWayController extends BaseController {
  async saveValues(req, res, next) {
    try {
      const action = req.form.values.proveAnotherWayRadio;

      switch (action) {
        case "proveAnotherWay": {
          break;
        }
        case "retry": {
          break;
        }
      }
    } catch (err) {
      if (err) {
        return next(err);
      }
    }
  }
}

module.exports = ProveAnotherWayController;
