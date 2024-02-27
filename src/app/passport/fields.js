const { firstNameMiddleNameLengthValidator } = require("./fieldsHelper");
const { expiryDateValidator } = require("./fieldsHelper");

const firstNameMiddleNameLengthValidatorObj = {
  fn: firstNameMiddleNameLengthValidator,
  arguments: [30, "firstName", "middleNames"]
};

const expiryDateValidatorObj = {
  fn: expiryDateValidator,
  arguments: [18, "expiryDate"]
};

module.exports = {
  firstNameMiddleNameLengthValidator: firstNameMiddleNameLengthValidator,
  passportNumber: {
    type: "text",
    journeyKey: "passportNumber",
    validate: [
      "required",
      "numeric",
      { type: "exactlength", arguments: [9] },
      { type: "limit", fn: (value) => !value.startsWith("9") }
    ],
    classes: "govuk-input--width-10"
  },
  surname: {
    type: "text",
    validate: [
      "required",
      { type: "maxlength", arguments: [30] },
      { type: "regexpassport", fn: (value) => value.match(/^[a-zA-Z .'-]*$/) }
    ],
    journeyKey: "surname"
  },
  firstName: {
    type: "text",
    validate: [
      "required",
      { type: "maxlength", arguments: [30] },
      { type: "regexpassport", fn: (value) => value.match(/^[a-zA-Z .'-]*$/) },
      {
        type: "firstNameMiddleNameLength",
        ...firstNameMiddleNameLengthValidatorObj
      }
    ],
    journeyKey: "firstName"
  },
  middleNames: {
    type: "text",
    journeyKey: "middleNames",
    validate: [
      { type: "maxlength", arguments: [30] },
      { type: "regexpassport", fn: (value) => value.match(/^[a-zA-Z .'-]*$/) },
      {
        type: "firstNameMiddleNameLength",
        ...firstNameMiddleNameLengthValidatorObj
      }
    ]
  },
  dateOfBirth: {
    type: "date",
    journeyKey: "dateOfBirth",
    validate: [
      "required",
      "date",
      { type: "before", arguments: [new Date().toISOString().split("T")[0]] }
    ],
    autocomplete: "bday"
  },
  expiryDate: {
    type: "date",
    journeyKey: "expiryDate",
    validate: [
      "required",
      "date",
      { type: "date" },
      {
        type: "expiryDate",
        ...expiryDateValidatorObj
      }
    ],
    autocomplete: "expiryDate"
  }
};
