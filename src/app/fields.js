module.exports = {
  passportNumber: {
    type: "text",
    validate: ["required", "numeric", { type: "exactlength", arguments: [9] }, { type: "limit", fn: value => !value.startsWith('9')}],
  },
  surname: {
    type: "text",
    validate: ["required"],
    journeyKey: "surname",
  },
  givenNames: {
    type: "text",
    validate: ["required"],
    journeyKey: "givenNames",
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
    validate: [
      "required",
      "date",
      { type: "after", arguments: [new Date(new Date().getFullYear(), new Date().getMonth() - 18, new Date().getDate()).toISOString().split("T")[0]] },
    ],
  },
};
