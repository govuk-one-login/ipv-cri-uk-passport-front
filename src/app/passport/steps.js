const done = require('./controllers/done');
const details = require("./controllers/details");

const validate = require("./controllers/validate");

module.exports = {
  "/": {
    resetJourney: true,
    entryPoint: true,
    skip: true,
    next: "details",
  },
  "/details": {
    fields: [
      "passportNumber",
      "surname",
      "givenNames",
      "dateOfBirth",
      "expiryDate",
    ],
    controller: details,
    next: "validate",
  },
  "/validate": {
    controller: validate,
    skip: true,
    next: "done"
  },
  "/done": {
    controller: done,
    noPost: true,
  }
};
