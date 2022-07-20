const details = require("./controllers/details");
const root = require("./controllers/root");
const validate = require("./controllers/validate");
const proveAnotherWay = require("./controllers/prove-another-way");

module.exports = {
  "/": {
    resetJourney: true,
    entryPoint: true,
    skip: true,
    controller: root,
    next: "details",
  },
  "/details": {
    fields: [
      "passportNumber",
      "surname",
      "firstName",
      "middleNames",
      "dateOfBirth",
      "expiryDate",
    ],
    controller: details,
    next: "validate",
  },
  "/prove-another-way": {
    prereqs: ["/passport/"],
    controller: proveAnotherWay,
    fields: ["proveAnotherWayRadio"],
    next: "details",
  },
  "/validate": {
    controller: validate,
    skip: true,
    next: validate.prototype.next,
  },
};
