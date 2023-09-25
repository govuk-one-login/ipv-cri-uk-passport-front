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
    const middleNameEmpty = !validators.string(middleName);
    const firstNameEmpty = !validators.string(firstName);
    const includeExtraCharacter = !middleNameEmpty && !firstNameEmpty;
    const extraCharacter = includeExtraCharacter ? 1 : 0;
    //This logic will add an extra character to nameMax (see below) if both first and
    //middle name fields are used, in order to ensure we remain within 30 characters limit

    const middleNameLength = validators.string(middleName)
      ? middleName.length
      : 0;
    const firstNameLength = validators.string(firstName) ? firstName.length : 0;

    const firstNameMin = firstNameLength > 0;
    const middleNameMin = middleNameLength > 0;
    const nameMin = firstNameMin || middleNameMin;
    const nameMax =
      firstNameLength + extraCharacter + middleNameLength <= length;

    return nameMin && nameMax;
  },
  expiryDateValidator(_value, validMonths, expiryDateField) {
    let earliestValidDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth() - validMonths,
      new Date().getDate()
    );

    const expiryDate = new Date(this.values[expiryDateField]);

    // Note always compare as Dates
    return expiryDate >= earliestValidDate;
  },
};
