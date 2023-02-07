const details = require("./controllers/details");
const root = require("./controllers/root");
const validate = require("./controllers/validate");

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
    prereqs: ["/"],
    fields: ["proveAnotherWayRadio"],
    next: [
      {
        field: "proveAnotherWayRadio",
        value: "retry",
        next: "/details",
      },
      "/oauth2/callback",
    ],
  },
  "/validate": {
    controller: validate,
    skip: true,
    next: [
      {
        field: "showRetryMessage",
        op: "===",
        value: true,
        next: "/details",
      },
      "/oauth2/callback",
    ],
  },
};
