const validateController = require("./controllers/validate");
const doneController = require('./controllers/done');
const passportDetails = require("./controllers/passport-details");

module.exports = {
  "/": {
    resetJourney: true,
    entryPoint: true,
    skip: true,
    next: "passport-details",
  },
  "/passport-details": {
    fields: [
      "passportNumber",
      "surname",
      "givenNames",
      "dateOfBirth",
      "expiryDate",
    ],
    controller: passportDetails,
    next: "validate",
  },
  "/validate": {
    controller: validateController,
    skip: true,
    next: "done"
  },
  "/done": {
    controller: doneController,
    next: "/redirect-uri"
  },
};
