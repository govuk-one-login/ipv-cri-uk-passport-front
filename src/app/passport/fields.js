const { validators } = require("hmpo-form-wizard/lib/validation");

function firstNameMiddleNameLengthValidator(
  _value,
  length,
  firstNameField,
  middleNameField
) {
  const firstName = this.values[firstNameField];
  const middleName = this.values[middleNameField];

  const middleNameLength = validators.string(middleName)
    ? middleName.length
    : 0;
  const firstNameLength = validators.string(firstName) ? firstName.length : 0;

  return middleNameLength + firstNameLength <= length;
}

const firstNameMiddleNameLengthValidatorObj = {
  fn: firstNameMiddleNameLengthValidator,
  arguments: [30, "firstName", "middleNames"],
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
      { type: "limit", fn: (value) => !value.startsWith("9") },
    ],
    classes: "govuk-input--width-10",
  },
  surname: {
    type: "text",
    validate: [
      "required",
      { type: "maxlength", arguments: [30] },
      { type: "regexpassport", fn: (value) => value.match(/^[a-zA-Z .'-]*$/) },
    ],
    journeyKey: "surname",
  },
  firstName: {
    type: "text",
    validate: [
      "required",
      { type: "maxlength", arguments: [30] },
      { type: "regexpassport", fn: (value) => value.match(/^[a-zA-Z .'-]*$/) },
      {
        type: "firstNameMiddleNameLength",
        ...firstNameMiddleNameLengthValidatorObj,
      },
    ],
    journeyKey: "firstName",
  },
  middleNames: {
    type: "text",
    journeyKey: "middleNames",
    validate: [
      { type: "maxlength", arguments: [30] },
      { type: "regexpassport", fn: (value) => value.match(/^[a-zA-Z .'-]*$/) },
      {
        type: "firstNameMiddleNameLength",
        ...firstNameMiddleNameLengthValidatorObj,
      },
    ],
  },
  dateOfBirth: {
    type: "date",
    journeyKey: "dateOfBirth",
    validate: [
      "required",
      "date",
      { type: "before", arguments: [new Date().toISOString().split("T")[0]] },
    ],
  },
  expiryDate: {
    type: "date",
    journeyKey: "expiryDate",
    validate: [
      "required",
      "date",
      {
        type: "after",
        arguments: [
          new Date(
            new Date().getFullYear(),
            new Date().getMonth() - 18,
            new Date().getDate()
          )
            .toISOString()
            .split("T")[0],
        ],
      },
    ],
  },
  proveAnotherWayRadio: {
    type: "radios",
    items: ["proveAnotherWay", "retry"],
    validate: ["required"],
  },
};
