const { expect: expect } = require("chai");
const moment = require("moment");
const TestDataCreator = require("../util/TestDataCreator");

exports.PassportPage = class PlaywrightDevPage {
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5050/details";

    this.passportNumber = this.page.locator('xpath=//*[@id="passportNumber"]');

    this.lastName = this.page.locator('xpath=//*[@id="surname"]');
    this.firstName = this.page.locator('xpath=//*[@id="firstName"]');
    this.middleNames = this.page.locator('xpath=//*[@id="middleNames"]');

    this.birthDay = this.page.locator('xpath=//*[@id="dateOfBirth-day"]');
    this.birthMonth = this.page.locator('xpath=//*[@id="dateOfBirth-month"]');
    this.birthYear = this.page.locator('xpath=//*[@id="dateOfBirth-year"]');

    this.passportValidToDay = this.page.locator(
      'xpath=//*[@id="expiryDate-day"]'
    );
    this.passportValidToMonth = this.page.locator(
      'xpath=//*[@id="expiryDate-month"]'
    );
    this.passportValidToYear = this.page.locator(
      'xpath=//*[@id="expiryDate-year"]'
    );

    // Error summary items

    this.invalidLastNameErrorInSummary = this.page.locator(
      'xpath=//*[@class="govuk-error-summary error-summary"]//*[@class="govuk-error-summary__body"]//*[@class="govuk-list govuk-error-summary__list"]//*[contains(@href,"#surname")]'
    );

    this.invalidFirstNameErrorInSummary = this.page.locator(
      'xpath=//*[@class="govuk-error-summary error-summary"]//*[@class="govuk-error-summary__body"]//*[@class="govuk-list govuk-error-summary__list"]//*[contains(@href,"#firstName")]'
    );

    this.invalidMiddleNamesErrorInSummary = this.page.locator(
      'xpath=//*[@class="govuk-error-summary error-summary"]//*[@class="govuk-error-summary__body"]//*[@class="govuk-list govuk-error-summary__list"]//*[contains(@href,"#middleNames")]'
    );

    this.errorSummaryBoxPassportNumber = this.page.locator(
      'xpath=//*[@class="govuk-error-summary error-summary"]//*[@class="govuk-error-summary__body"]//*[@class="govuk-list govuk-error-summary__list"]//*[contains(@href,"#passportNumber")]'
    );

    this.invalidDobErrorInSummary = this.page.locator(
      'xpath=//*[@class="govuk-error-summary error-summary"]//*[@class="govuk-error-summary__body"]//*[@class="govuk-list govuk-error-summary__list"]//*[contains(@href,"#dateOfBirth-day")]'
    );

    this.invalidValidToDateErrorInSummary = this.page.locator(
      'xpath=//*[@class="govuk-error-summary error-summary"]//*[@class="govuk-error-summary__body"]//*[@class="govuk-list govuk-error-summary__list"]//*[contains(@href,"#expiryDate-day")]'
    );

    this.invalidValidToDateFieldError = this.page.locator(
      'xpath=//*[@id="expiryDate-error"]'
    );

    // Field errors

    this.invalidLastNameFieldError = this.page.locator(
      'xpath=//*[@id="surname-error"]'
    );
    this.invalidFirstNameFieldError = this.page.locator(
      'xpath=//*[@id="firstName-error"]'
    );
    this.invalidMiddleNamesFieldError = this.page.locator(
      'xpath=//*[@id="middleNames-error"]'
    );
    this.drivingPassportNumberFieldError = this.page.locator(
      'xpath=//*[@id="passportNumber-error"]'
    );

    this.passportRetryMessageHeading = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/div[1]/div[2]'
    );

    this.passportNumberFieldError = this.page.locator(
      'xpath=//*[@id="passportNumber-error"]'
    );
    this.invalidDobFieldError = this.page.locator(
      'xpath=//*[@id="dateOfBirth-error"]'
    );
    this.invalidValidToDateFieldError = this.page.locator(
      'xpath=//*[@id="expiryDate-error"]'
    );

    //    this.Continue = this.page.locator("button", {
    //      hasText: " Continue ",
    //    });

    this.Continue = this.page.locator('xpath=//*[@id="continue"]');

    // Content Fields

    this.betaBannerReads = this.page.locator(
      "xpath=/html/body/div[2]/div/p/span"
    );

    this.betaBanner = this.page.locator("xpath=/html/body/div[2]/div/p/strong");

    this.lastNameLabel = this.page.locator('xpath=//*[@id="surname-label"]');

    this.givenNameLegend = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/form/div[2]/fieldset/legend'
    );

    this.firstNameLabel = this.page.locator('xpath=//*[@id="firstName-label"]');

    this.middleNames = this.page.locator('xpath=//*[@id="middleNames-label"]');

    this.firstNameSentence = this.page.locator(
      'xpath=//*[@id="firstName-hint"]'
    );
    this.middleNameSentence = this.page.locator(
      'xpath=//*[@id="middleNames-hint"]'
    );

    this.dobFieldTitleLegend = this.page.locator(
      'xpath=//*[@id="dateOfBirth-fieldset"]/legend'
    );

    this.dobExample = this.page.locator('xpath=//*[@id="dateOfBirth-hint"]');

    this.dayLabel = this.page.locator(
      'xpath=//*[@id="dateOfBirth"]/div[1]/div/label'
    );

    this.monthLabel = this.page.locator(
      'xpath=//*[@id="dateOfBirth"]/div[2]/div/label'
    );

    this.yearLabel = this.page.locator(
      'xpath=//*[@id="dateOfBirth"]/div[3]/div/label'
    );

    this.validToFieldTitleLegend = this.page.locator(
      'xpath=//*[@id="expiryDate-fieldset"]/legend'
    );

    this.validToFieldHint = this.page.locator(
      'xpath=//*[@id="expiryDate-hint"]'
    );

    this.validTodayLabel = this.page.locator(
      'xpath=//*[@id="expiryDate"]/div[1]/div/label'
    );

    this.validToMonthLabel = this.page.locator(
      'xpath=//*[@id="expiryDate"]/div[2]/div/label'
    );

    this.validToYearLabel = this.page.locator(
      'xpath=//*[@id="expiryDate"]/div[3]/div/label'
    );

    this.passportNumberLabel = this.page.locator(
      'xpath=//*[@id="passportNumber-label"]'
    );

    this.licenceNumberHint = this.page.locator(
      'xpath=//*[@id="passportNumber-hint"]'
    );

    this.retryCheckDetailsTitleLabel = this.page.locator(
      'xpath=//*[@id="header"]'
    );

    this.errorText = this.page.locator(
      'xpath=//*[@id="govuk-notification-banner-title"]'
    );

    this.thereWasAProblemFirstSentence = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/div[1]/div[2]/p[1]'
    );
  }

  isCurrentPage() {
    return (
      this.page.url() === this.url || this.page.url() === this.url + "?lang=cy"
    );
  }

  async assertPageTitle(PassportPageTitle) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.page.title()).to.equal(PassportPageTitle);
  }

  async clickOnContinue() {
    await this.Continue.click();
  }

  async userEntersData(passportSubjectScenario) {
    var passportSubject = TestDataCreator.getPassportTestUserFromMap(
      passportSubjectScenario
    );
    await this.passportNumber.fill(passportSubject.getPassportNumber());
    await this.birthDay.fill(passportSubject.getBirthDay());
    await this.birthMonth.fill(passportSubject.getBirthMonth());
    await this.birthYear.fill(passportSubject.getBirthYear());

    if ((await passportSubject.getMiddleNames()) != null) {
      await this.middleNames.fill(passportSubject.getMiddleNames());
    }
    await this.firstName.fill(passportSubject.getFirstName());
    await this.lastName.fill(passportSubject.getLastName());
    await this.passportValidToDay.fill(passportSubject.getPassportValidToDay());
    await this.passportValidToMonth.fill(
      passportSubject.getPassportValidToMonth()
    );
    await this.passportValidToYear.fill(
      passportSubject.getPassportValidToYear()
    );
  }

  // Re-enter test data

  async userReEntersLastName(InvalidLastName) {
    await this.lastName.fill(InvalidLastName);
  }

  async userReEntersFirstName(InvalidFirstName) {
    await this.firstName.fill(InvalidFirstName);
  }

  async userReEntersMiddleName(InvalidMiddleNames) {
    await this.middleNames.fill(InvalidMiddleNames);
  }

  async userReEntersPassportNumber(InvalidPassportNumber) {
    await this.licenceNumber.fill(InvalidPassportNumber);
  }

  async userReEntersDayOfBirth(InvalidDayOfBirth) {
    await this.birthDay.fill(InvalidDayOfBirth);
  }

  async userReEntersMonthOfBirth(InvalidMonthOfBirth) {
    await this.birthMonth.fill(InvalidMonthOfBirth);
  }

  async userReEntersYearOfBirth(InvalidYearOfBirth) {
    await this.birthYear.fill(InvalidYearOfBirth);
  }

  async userReEntersExpiryDayAsCurrentDateMinus(days) {
    await this.passportValidToDay.fill(
      moment().subtract(days, "days").format("DD")
    );
  }

  async userReEntersDayOfIssueAsCurrentDatePlus(days) {
    await this.passportValidToDay.fill(moment().add(days, "days").format("DD"));
  }

  async userReEntersMonthOfIssue(InvalidMonthOfIssue) {
    await this.passportValidToMonth.fill(InvalidMonthOfIssue);
  }

  async userReEntersExpiryMonthAsCurrentDateMinus(months) {
    await this.passportValidToMonth.fill(
      moment().subtract(months, "months").format("MM")
    );
  }

  async userReEntersYearOfIssue(InvalidYearOfIssue) {
    await this.licenceIssueYear.fill(InvalidYearOfIssue);
  }

  async userReEntersExpiryYearAsCurrentDateMinus(years) {
    await this.passportValidToYear.fill(
      moment().subtract(years, "years").format("YYYY")
    );
  }

  async userReEntersValidToDay(InvalidValidToDay) {
    await this.passportValidToDay.fill(InvalidValidToDay);
  }

  async userReEntersValidToMonth(InvalidValidToMonth) {
    await this.passportValidToMonth.fill(InvalidValidToMonth);
  }

  async userReEntersValidToYear(InvalidValidToYear) {
    await this.passportValidToYear.fill(InvalidValidToYear);
  }

  // Summary box errors and field errors

  async assertInvalidLastNameInErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidLastNameErrorInSummary.innerText()).to.equal(
      errorSummaryText
    );
  }

  async assertInvalidLastNameOnField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidLastNameFieldError.innerText()).to.contains(
      fieldErrorText
    );
  }

  async assertInvalidFirstNameInErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidFirstNameErrorInSummary.innerText()).to.equal(
      errorSummaryText
    );
  }

  async assertInvalidFirstNameOnField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidFirstNameFieldError.innerText()).to.contains(
      fieldErrorText
    );
  }

  async assertInvalidMiddleNameInErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidMiddleNamesErrorInSummary.innerText()).to.equal(
      errorSummaryText
    );
  }

  async assertInvalidMiddleNameOnField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidMiddleNamesFieldError.innerText()).to.contains(
      fieldErrorText
    );
  }

  async assertInvalidPassportNumberInErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.errorSummaryBoxLicenceNumber.innerText()).to.equal(
      errorSummaryText
    );
  }

  async assertInvalidPassportNumberOnField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.drivingPassportNumberFieldError.innerText()).to.contains(
      fieldErrorText
    );
  }

  async assertRetryErrorMessage(retryMessageHeading) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(
      await this.drivingLicenceRetryMessageHeading.innerText()
    ).to.contains(retryMessageHeading);
  }

  async assertInvalidIssueNumberInErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidIssueNumberErrorInSummary.innerText()).to.equal(
      errorSummaryText
    );
  }

  async assertInvalidIssueNumberOnField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidIssueNumberFieldError.innerText()).to.contains(
      fieldErrorText
    );
  }

  async assertInvalidPostcodeInErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidPostcodeErrorInSummary.innerText()).to.equal(
      errorSummaryText
    );
  }

  async assertInvalidPostcodeOnField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidPostcodeFieldError.innerText()).to.contains(
      fieldErrorText
    );
  }

  async assertInvalidDoBInErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidDobErrorInSummary.innerText()).to.equal(
      errorSummaryText
    );
  }

  async assertInvalidDoBOnField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidDobFieldError.innerText()).to.contains(
      fieldErrorText
    );
  }

  async assertInvalidValidToDateInErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidValidToDateErrorInSummary.innerText()).to.equal(
      errorSummaryText
    );
  }

  async assertInvalidValidToDateOnField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidValidToDateFieldError.innerText()).to.contains(
      fieldErrorText
    );
  }

  async consentCheckBoxUnselect() {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    return await this.consentDVLACheckbox.click();
  }

  async assertConsentErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidConsentErrorSummary.innerText()).to.contains(
      errorSummaryText
    );
  }

  async assertConsentErrorOnField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidConsentErrorFieldError.innerText()).to.contains(
      fieldErrorText
    );
  }

  //  Language
  async assertBetaBanner(betaBannerLabel) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.betaBanner.textContent()).to.contains(
      betaBannerLabel
    );
  }

  async assertBetaBannerText(assertBetaBannerText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.betaBannerReads.textContent()).to.contains(
      assertBetaBannerText
    );
  }

  async assertLastName(dvlalastNameLabel) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.lastNameLabel.textContent()).to.contains(
      dvlalastNameLabel
    );
  }

  async assertGivenName(dvlagivenNameLegend) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.givenNameLegend.textContent()).to.contain(
      dvlagivenNameLegend
    );
  }

  async assertFirstName(dvlaFirstName) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.firstNameLabel.textContent()).to.contain(dvlaFirstName);
  }

  async assertMiddleName(dvlaMiddleName) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.middleNames.textContent()).to.contain(dvlaMiddleName);
  }

  async assertFirstNameSentence(dvlaFirstNameSent) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.firstNameSentence.innerText()).to.equal(
      dvlaFirstNameSent
    );
  }

  async assertMiddleNameSentence(dvlaMiddleNameSentence) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.middleNameSentence.innerText()).to.equal(
      dvlaMiddleNameSentence
    );
  }

  async assertDoBFieldTitle(dobFieldTitleLegend) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.dobFieldTitleLegend.innerText()).to.equal(
      dobFieldTitleLegend
    );
  }

  async assertDobExample(dobExample) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.dobExample.innerText()).to.equal(dobExample);
  }

  async assertDay(day) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.dayLabel.innerText()).to.contains(day);
  }

  async assertMonth(month) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.monthLabel.innerText()).to.contains(month);
  }

  async assertYear(year) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.yearLabel.innerText()).to.contains(year);
  }

  async assertValidDateFieldTitle(validDateFieldTitle) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.validToFieldTitleLegend.innerText()).to.equal(
      validDateFieldTitle
    );
  }

  async assertValidDateExample(validDateExample) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.validToFieldHint.innerText()).to.equal(validDateExample);
  }

  async assertLicenceTitle(validlicenceNumberLabel) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.licenceNumberLabel.innerText()).to.equal(
      validlicenceNumberLabel
    );
  }

  async assertLicenceExample(validlicenceNumberHint) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.licenceNumberHint.innerText()).to.equal(
      validlicenceNumberHint
    );
  }

  async assertIssueNumberTitle(issueNumberLabel) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.issueNumberLabel.innerText()).to.equal(issueNumberLabel);
  }

  async assertIssueSentenceExample(issueNumberSentence) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.issueNumberHint.innerText()).to.equal(
      issueNumberSentence
    );
  }

  async assertPostcodeTitle(postcodeTitle) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.postcodeLabel.innerText()).to.equal(postcodeTitle);
  }

  async assertPostcodeSentence(postcodeSentence) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.postcodeHint.innerText()).to.equal(postcodeSentence);
  }

  async assertIssueDay(issueDay) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.issueDayLabel.innerText()).to.contains(issueDay);
  }

  async assertIssueMonth(issueMonth) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.issueMonthLabel.innerText()).to.contains(issueMonth);
  }

  async assertIssueYear(issueYear) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.issueYearLabel.innerText()).to.contains(issueYear);
  }

  async assertValidToDay(validToDay) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.validTodayLabel.innerText()).to.contains(validToDay);
  }

  async assertValidToMonth(validToMonth) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.validToMonthLabel.innerText()).to.contains(validToMonth);
  }

  async assertValidToYear(validToYear) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.validToYearLabel.innerText()).to.contains(validToYear);
  }

  async assertDVLAConsent(consentTitle) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.consentSectionTitle.innerText()).to.equal(consentTitle);
  }

  async assertDVLAConsentSentenceOne(consentFirstSentence) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.consentSectionSentenceOne.innerText()).to.contains(
      consentFirstSentence
    );
  }

  async assertDVLAConsentSentenceTwo(consentSecondSentence) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.consentSectionSentenceTwo.innerText()).to.contains(
      consentSecondSentence
    );
  }

  async assertConsentOneLoginLink(consentOneLoginLink) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.oneLoginLink.innerText()).to.equal(consentOneLoginLink);
  }

  async assertConsentPrivacyLink(consentPrivacyLink) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.privacyPolicyDVLALink.innerText()).to.equal(
      consentPrivacyLink
    );
  }

  async assertRetryTitle(checkDetailsTitle) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.retryCheckDetailsTitleLabel.innerText()).to.contains(
      checkDetailsTitle
    );
  }

  async assertErrorPrefix(errorPrefix) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.errorText.innerText()).to.equal(errorPrefix);
  }

  async assertYouWillBeAbleToFindSentence(errorSummaryMessage) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.thereWasAProblemFirstSentence.innerText()).to.contains(
      errorSummaryMessage
    );
  }
};
