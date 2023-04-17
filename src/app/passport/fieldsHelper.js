const { validators } = require("hmpo-form-wizard/lib/validation");

module.exports = {
  firstNameMiddleNameLengthValidator(
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

    const firstNameMin = firstNameLength > 0;
    const middleNameMin = middleNameLength > 0;
    const nameMin = firstNameMin || middleNameMin;

    return nameMin && middleNameLength + firstNameLength <= length;
  },
};
