const BaseController = require("hmpo-form-wizard").Controller;

class DoneController extends BaseController {
  mapItemToSummaryListRow(item) {
    return {
      key: {
        text: item[0],
      },
      value: {
        text: item[1],
      },
    };
  }

  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      const requestValue = req.sessionModel.toJSON();
      delete requestValue["csrf-secret"];

      locals.sentValuesSummaryList = Object.entries(requestValue).map(
        this.mapItemToSummaryListRow
      );

      locals.responseValuesSummaryList = [
        {
          key: {
            text: "code",
          },
          value: {
            text: req.session.authorization_code,
          },
        }
      ]

      callback(null, locals);
    });
  }
}

module.exports = DoneController;
