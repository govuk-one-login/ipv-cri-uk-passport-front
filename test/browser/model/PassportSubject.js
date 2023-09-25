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
  return this.licenceNumber;
};

PassportSubject.prototype.setLicenceNumber = function (licenceNumber) {
  this.licenceNumber = licenceNumber;
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

PassportSubject.prototype.getLicenceIssueDay = function () {
  return this.licenceIssueDay;
};

PassportSubject.prototype.setLicenceIssueDay = function (licenceIssueDay) {
  this.licenceIssueDay = licenceIssueDay;
};

PassportSubject.prototype.getLicenceIssueMonth = function () {
  return this.licenceIssueMonth;
};

PassportSubject.prototype.setLicenceIssueMonth = function (licenceIssueMonth) {
  this.licenceIssueMonth = licenceIssueMonth;
};

PassportSubject.prototype.getLicenceIssueYear = function () {
  return this.licenceIssueYear;
};

PassportSubject.prototype.setLicenceIssueYear = function (licenceIssueYear) {
  this.licenceIssueYear = licenceIssueYear;
};

PassportSubject.prototype.getIssueNumber = function () {
  return this.issueNumber;
};

PassportSubject.prototype.setIssueNumber = function (issueNumber) {
  this.issueNumber = issueNumber;
};

PassportSubject.prototype.getConsentDVLACheckbox = function () {
  return this.consentDVLACheckbox;
};

PassportSubject.prototype.setConsentDVLACheckbox = function (
  consentDVLACheckbox
) {
  this.consentDVLACheckbox = consentDVLACheckbox;
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

PassportSubject.prototype.setLicenceValidToDay = function (passportValidToDay) {
  this.passportValidToDay = passportValidToDay;
};

PassportSubject.prototype.getPassportValidToMonth = function () {
  return this.passportValidToMonth;
};

PassportSubject.prototype.setLicenceValidToMonth = function (
  passportValidToMonth
) {
  this.passportValidToMonth = passportValidToMonth;
};

PassportSubject.prototype.getPassportValidToYear = function () {
  return this.passportValidToYear;
};

PassportSubject.prototype.setLicenceValidToYear = function (
  passportValidToYear
) {
  this.passportValidToYear = passportValidToYear;
};

PassportSubject.prototype.getPostcode = function () {
  return this.postcode;
};

PassportSubject.prototype.setPostcode = function (postcode) {
  this.postcode = postcode;
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
