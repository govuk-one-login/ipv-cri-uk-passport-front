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
      delete requestValue["authorization_code"];
      delete requestValue["error"];

      locals.sentValuesSummaryList = Object.entries(requestValue).map(
        this.mapItemToSummaryListRow
      );

      locals.responseValuesSummaryList = []

      const authCode = req.sessionModel.get("authorization_code");

      authCode && locals.responseValuesSummaryList.push(
        {
          key: {
            text: "code",
          },
          value: {
            text: authCode,
          },
        }
      );

      const error = req.sessionModel.get("error");
      error && locals.responseValuesSummaryList.push(
        {
          key: {
            text: "error_code",
          },
          value: {
            text: error?.code
          }
        },
        {
          key: {
            text: "error_description",
          },
          value: {
            text: error?.description ?? error?.message
          }
        },
      );


      callback(null, locals);
    });
  }
}

module.exports = DoneController;
