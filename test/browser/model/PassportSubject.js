function PassportSubject(
  passportNumber,
  birthDay,
  birthMonth,
  birthYear,
  middleNames,
  lastName,
  firstName,
  passportValidToDay,
  passportValidToMonth,
  passportValidToYear
) {
  this.passportNumber = passportNumber || null;
  this.birthDay = birthDay || null;
  this.birthMonth = birthMonth || null;
  this.birthYear = birthYear || null;
  this.middleNames = middleNames || null;
  this.lastName = lastName || null;
  this.firstName = firstName || null;
  this.passportValidToDay = passportValidToDay || null;
  this.passportValidToMonth = passportValidToMonth || null;
  this.passportValidToYear = passportValidToYear || null;
}

PassportSubject.prototype.getPassportNumber = function () {
  return this.passportNumber;
};

PassportSubject.prototype.setPassportNumber = function (passportNumber) {
  this.passportNumber = passportNumber;
};

PassportSubject.prototype.getBirthDay = function () {
  return this.birthDay;
};

PassportSubject.prototype.setBirthDay = function (birthDay) {
  this.birthDay = birthDay;
};

PassportSubject.prototype.getBirthMonth = function () {
  return this.birthMonth;
};

PassportSubject.prototype.setBirthMonth = function (birthMonth) {
  this.birthMonth = birthMonth;
};

PassportSubject.prototype.getBirthYear = function () {
  return this.birthYear;
};

PassportSubject.prototype.setBirthYear = function (birthYear) {
  this.birthYear = birthYear;
};

PassportSubject.prototype.getMiddleNames = function () {
  return this.middleNames;
};

PassportSubject.prototype.setMiddleNames = function (middleNames) {
  this.middleNames = middleNames;
};

PassportSubject.prototype.getLastName = function () {
  return this.lastName;
};

PassportSubject.prototype.setLastName = function (lastName) {
  this.lastName = lastName;
};

PassportSubject.prototype.getFirstName = function () {
  return this.firstName;
};

PassportSubject.prototype.setFirstName = function (firstName) {
  this.firstName = firstName;
};

PassportSubject.prototype.getPassportValidToDay = function () {
  return this.passportValidToDay;
};

PassportSubject.prototype.setPassportValidToDay = function (
  passportValidToDay
) {
  this.passportValidToDay = passportValidToDay;
};

PassportSubject.prototype.getPassportValidToMonth = function () {
  return this.passportValidToMonth;
};

PassportSubject.prototype.setPassportValidToMonth = function (
  passportValidToMonth
) {
  this.passportValidToMonth = passportValidToMonth;
};

PassportSubject.prototype.getPassportValidToYear = function () {
  return this.passportValidToYear;
};

PassportSubject.prototype.setPassportValidToYear = function (
  passportValidToYear
) {
  this.passportValidToYear = passportValidToYear;
};

PassportSubject.prototype.equals = function (otherPassportSubject) {
  return (
    otherPassportSubject.getPassportNumber() == this.getPassportNumber() &&
    otherPassportSubject.getBirthDay() == this.getBirthDay() &&
    otherPassportSubject.getBirthMonth() == this.getBirthMonth() &&
    otherPassportSubject.getBirthYear() == this.getBirthYear() &&
    otherPassportSubject.getLicenceIssueDay() == this.getLicenceIssueDay() &&
    otherPassportSubject.getLicenceIssueMonth() ==
      this.getLicenceIssueMonth() &&
    otherPassportSubject.getLicenceIssueYear() == this.getLicenceIssueYear() &&
    otherPassportSubject.getIssueNumber() == this.getIssueNumber() &&
    otherPassportSubject.getConsentDVLACheckbox() ==
      this.getConsentDVLACheckbox() &&
    otherPassportSubject.getMiddleNames() == this.getMiddleNames() &&
    otherPassportSubject.getLastName() == this.getLastName() &&
    otherPassportSubject.getFirstName() == this.getFirstName() &&
    otherPassportSubject.getPassportValidToDay() ==
      this.getPassportValidToDay() &&
    otherPassportSubject.getPassportValidToMonth() ==
      this.getPassportValidToMonth() &&
    otherPassportSubject.getPassportValidToYear() ==
      this.getPassportValidToYear() &&
    otherPassportSubject.getPostcode() == this.getPostcode()
  );
};

PassportSubject.prototype.fill = function (newFields) {
  for (var field in newFields) {
    if (
      Object.prototype.hasOwnProperty.call(this, field) &&
      Object.prototype.hasOwnProperty.call(newFields, field)
    ) {
      if (this[field] !== "undefined") {
        this[field] = newFields[field];
      }
    }
  }
};

module.exports = PassportSubject;
