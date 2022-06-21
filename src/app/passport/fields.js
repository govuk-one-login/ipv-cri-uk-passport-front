module.exports = {
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
    ],
    journeyKey: "firstName",
  },
  middleNames: {
    type: "text",
    journeyKey: "middleNames",
    validate: [
      { type: "maxlength", arguments: [30] },
      { type: "regexpassport", fn: (value) => value.match(/^[a-zA-Z .'-]*$/) },
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
};
