const { Given, When, Then } = require("@cucumber/cucumber");

const { PassportPage } = require("../pages/PassportPage");

Then(/^I can see CTA {string}$/, async function () {});

Then(
  /^I should be on the Passport details entry page (.*)$/,
  async function (PassportPageTitle) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertDVLAPageTitle(PassportPageTitle);
  }
);

Then(/^User clicks on continue$/, { timeout: 2 * 5000 }, async function () {
  const passportPage = new PassportPage(this.page);
  await passportPage.clickOnContinue();
});

Given(
  /^User enters DVLA data as a (.*)$/,
  { timeout: 2 * 5000 },
  async function (passportSubject) {
    const passportPage = new PassportPage(this.page);
    await passportPage.userEntersData(passportSubject);
  }
);

// Re-enter test data step-defs

Then(
  /^User re-enters last name as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidLastName) {
    const passportPage = new PassportPage(this.page);
    await passportPage.userReEntersLastName(InvalidLastName);
  }
);

Then(
  /^User re-enters first name as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidFirstName) {
    const passportPage = new PassportPage(this.page);
    await passportPage.userReEntersFirstName(InvalidFirstName);
  }
);

Then(
  /^User re-enters middle names as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidMiddleNames) {
    const passportPage = new PassportPage(this.page);
    await passportPage.userReEntersMiddleName(InvalidMiddleNames);
  }
);

Then(
  /^User re-enters passportNumber as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidPassportNumber) {
    const passportPage = new PassportPage(this.page);
    await passportPage.userReEntersPassportNumber(InvalidPassportNumber);
  }
);

Then(
  /^User re-enters day of birth as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidDayOfBirth) {
    const passportPage = new PassportPage(this.page);
    await passportPage.userReEntersDayOfBirth(InvalidDayOfBirth);
  }
);

Then(
  /^User re-enters month of birth as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidMonthOfBirth) {
    const passportPage = new PassportPage(this.page);
    await passportPage.userReEntersMonthOfBirth(InvalidMonthOfBirth);
  }
);

Then(
  /^User re-enters year of birth as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidYearOfBirth) {
    const passportPage = new PassportPage(this.page);
    await passportPage.userReEntersYearOfBirth(InvalidYearOfBirth);
  }
);

Then(
  /^User enters expiry date as current date$/,
  { timeout: 2 * 5000 },
  async function () {
    const passportPage = new PassportPage(this.page);
    await passportPage.userReEntersExpiryDateAsCurrentDate();
  }
);

Then(
  /^User re-enters expiry day as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidExpiryDay) {
    const passportPage = new PassportPage(this.page);
    await passportPage.userReEntersDayOfIssue(InvalidExpiryDay);
  }
);

Then(
  /^User enters expiry day as current day minus (.*)$/,
  { timeout: 2 * 5000 },
  async function (daysToSubtract) {
    const passportPage = new PassportPage(this.page);
    await passportPage.userReEntersExpiryDayAsCurrentDateMinus(
      daysToSubtract
    );
  }
);

Then(
  /^User enters expiry day as current day plus (.*)$/,
  { timeout: 2 * 5000 },
  async function (daysToAdd) {
    const passportPage = new PassportPage(this.page);
    await passportPage.userReEntersExpiryDayAsCurrentDatePlus(daysToAdd);
  }
);

Then(
  /^User re-enters expiry month as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidExpiryMonth) {
    const passportPage = new PassportPage(this.page);
    await passportPage.userReEntersMonthOfIssue(InvalidExpiryMonth);
  }
);

Then(
  /^User re-enters year of issue as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidYearOfBirth) {
    const passportPage = new PassportPage(this.page);
    await passportPage.userReEntersYearOfIssue(InvalidYearOfBirth);
  }
);

Then(
  /^User enters year of issue as current year minus (.*)$/,
  { timeout: 2 * 5000 },
  async function (yearsToSubtract) {
    const passportPage = new PassportPage(this.page);
    await passportPage.userReEntersExpiryYearAsCurrentDateMinus(
      yearsToSubtract
    );
  }
);

Then(
  /^User re-enters valid to day as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidValidToDay) {
    const passportPage = new PassportPage(this.page);
    await passportPage.userReEntersValidToDay(InvalidValidToDay);
  }
);

Then(
  /^User re-enters valid to month as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidValidToMonth) {
    const passportPage = new PassportPage(this.page);
    await passportPage.userReEntersValidToMonth(InvalidValidToMonth);
  }
);

Then(
  /^User re-enters valid to year (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidValidToYear) {
    const passportPage = new PassportPage(this.page);
    await passportPage.userReEntersValidToYear(InvalidValidToYear);
  }
);

// Summary box and field errors step-defs

Then(
  /^I see the Lastname error in the error summary as (.*)$/,
  async function (errorSummaryText) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertInvalidLastNameInErrorSummary(
      errorSummaryText
    );
  }
);

Then(
  /^I see the Lastname error in the error field as (.*)$/,
  async function (fieldErrorText) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertInvalidLastNameOnField(fieldErrorText);
  }
);

Then(
  /^I see the Firstname error summary as (.*)$/,
  async function (errorSummaryText) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertInvalidFirstNameInErrorSummary(
      errorSummaryText
    );
  }
);

Then(
  /^I see the Firstname error in the error field as (.*)$/,
  async function (fieldErrorText) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertInvalidFirstNameOnField(fieldErrorText);
  }
);

Then(
  /^I see the middlenames error summary as (.*)$/,
  async function (errorSummaryText) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertInvalidMiddleNameInErrorSummary(
      errorSummaryText
    );
  }
);

Then(
  /^I see the middlenames error in the error field as (.*)$/,
  async function (fieldErrorText) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertInvalidMiddleNameOnField(fieldErrorText);
  }
);

Then(
  /^I see the licence number error in the summary as (.*)$/,
  async function (errorSummaryText) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertInvalidPassportNumberInErrorSummary(
      errorSummaryText
    );
  }
);

Then(
  /^I can see the licence number error in the field as (.*)$/,
  async function (fieldErrorText) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertInvalidPassportNumberOnField(fieldErrorText);
  }
);

Then(
  /^Proper error message is displayed as (.*)$/,
  async function (retryMessageHeading) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertRetryErrorMessage(retryMessageHeading);
  }
);

Then(
  /^I see the issue number error in summary as (.*)$/,
  async function (errorSummaryText) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertInvalidIssueNumberInErrorSummary(
      errorSummaryText
    );
  }
);

Then(
  /^I see the issue number error in field as (.*)$/,
  async function (fieldErrorText) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertInvalidIssueNumberOnField(fieldErrorText);
  }
);

Then(
  /^I see the postcode error in summary as (.*)$/,
  async function (errorSummaryText) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertInvalidPostcodeInErrorSummary(
      errorSummaryText
    );
  }
);

Then(
  /^I see the postcode error in field as (.*)$/,
  async function (fieldErrorText) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertInvalidPostcodeOnField(fieldErrorText);
  }
);

Then(
  /^I see the date of birth error summary as (.*)$/,
  async function (errorSummaryText) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertInvalidDoBInErrorSummary(errorSummaryText);
  }
);

Then(
  /^I see the date of birth error in the field as (.*)$/,
  async function (fieldErrorText) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertInvalidDoBOnField(fieldErrorText);
  }
);

Then(
  /^I see issue date error in summary as (.*)$/,
  async function (errorSummaryText) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertInvalidIssueInErrorSummary(errorSummaryText);
  }
);

Then(
  /^I see invalid issue date field error as (.*)$/,
  async function (fieldErrorText) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertInvalidIssueOnField(fieldErrorText);
  }
);

Then(
  /^I can see the valid to date error in the error summary as (.*)$/,
  async function (errorSummaryText) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertInvalidValidToDateInErrorSummary(
      errorSummaryText
    );
  }
);

Then(
  /^I can see the Valid to date field error as (.*)$/,
  async function (fieldErrorText) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertInvalidValidToDateOnField(fieldErrorText);
  }
);

Then(/^DVLA consent checkbox is unselected$/, async function () {
  const passportPage = new PassportPage(this.page);
  await passportPage.consentCheckBoxUnselect();
});

Then(
  /^I can see the DVLA consent error summary as (.*)$/,
  { timeout: 2 * 5000 },
  async function (errorSummaryText) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertConsentErrorSummary(errorSummaryText);
  }
);

Then(
  /^I can see the DVLA consent error on the checkbox as (.*)$/,
  { timeout: 2 * 5000 },
  async function (fieldErrorText) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertConsentErrorOnField(fieldErrorText);
  }
);

//##################### DVA ##########################

Then(
  /^I should be on the DVA details entry page (.*)$/,
  async function (passportPageTitle) {
    const passportPage = new DVADetailsEntryPage(this.page);
    await passportPage.assertDVAPageTitle(passportPageTitle);
  }
);

Given(
  /^User enters DVA data as a (.*)$/,
  { timeout: 3 * 5000 },
  async function (dvaPassportSubject) {
    const passportPage = new DVADetailsEntryPage(this.page);
    await passportPage.userEntersDVAData(
      "DVA",
      dvaPassportSubject
    );
  }
);

Then(/^I check the page Title (.*)$/, async function (dvaErrorPageTitle) {
  const passportPage = new DVADetailsEntryPage(this.page);
  await passportPage.assertDVAErrorPageTitle(dvaErrorPageTitle);
});

//################### Text content comparisons ########################

Then(
  /^I view the (.*) banner$/,
  { timeout: 2 * 5000 },
  async function (betaBannerLabel) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertBetaBanner(betaBannerLabel);
  }
);

Then(/^the beta banner reads (.*)$/, async function (betaBannerText) {
  const passportPage = new PassportPage(this.page);
  await passportPage.assertBetaBannerText(betaBannerText);
});

Then(/^I can see the lastname as (.*)$/, async function (dvlaLastName) {
  const passportPage = new PassportPage(this.page);
  await passportPage.assertLastName(dvlaLastName);
});

Then(/^I can see the givenName as (.*)$/, async function (dvlaGivenName) {
  const passportPage = new PassportPage(this.page);
  await passportPage.assertGivenName(dvlaGivenName);
});

Then(/^I can see the firstName as (.*)$/, async function (dvlaFirstName) {
  const passportPage = new PassportPage(this.page);
  await passportPage.assertFirstName(dvlaFirstName);
});

Then(/^I can see the middleName as (.*)$/, async function (dvlaMiddleName) {
  const passportPage = new PassportPage(this.page);
  await passportPage.assertMiddleName(dvlaMiddleName);
});

Then(
  /^I can see the first name sentence (.*)$/,
  async function (dvlaFirstNameSent) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertFirstNameSentence(dvlaFirstNameSent);
  }
);

Then(
  /^I can see the middle name sentence (.*)$/,
  async function (dvlaMiddleNameSentence) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertMiddleNameSentence(dvlaMiddleNameSentence);
  }
);

Then(/^I can see the DoB fields titled (.*)$/, async function (dobFieldTitle) {
  const passportPage = new PassportPage(this.page);
  await passportPage.assertDoBFieldTitle(dobFieldTitle);
});

Then(/^I can see example as (.*)$/, async function (dobExample) {
  const passportPage = new PassportPage(this.page);
  await passportPage.assertDobExample(dobExample);
});

Then(/^I can see date as (.*)$/, async function (day) {
  const passportPage = new PassportPage(this.page);
  await passportPage.assertDay(day);
});

Then(/^I can see month as (.*)$/, async function (month) {
  const passportPage = new PassportPage(this.page);
  await passportPage.assertMonth(month);
});

Then(/^I can see year as (.*)$/, async function (year) {
  const passportPage = new PassportPage(this.page);
  await passportPage.assertYear(year);
});

Then(
  /^I can see the Issue date field titled (.*)$/,
  async function (issueFieldTitle) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertIssueDateFieldTitle(issueFieldTitle);
  }
);

Then(
  /^I can see Issue date sentence as (.*)$/,
  async function (issueDateExample) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertIssueDateExample(issueDateExample);
  }
);

Then(/^I can see issue day as (.*)$/, async function (issueDay) {
  const passportPage = new PassportPage(this.page);
  await passportPage.assertIssueDay(issueDay);
});

Then(/^I can see issue month as (.*)$/, async function (issueMonth) {
  const passportPage = new PassportPage(this.page);
  await passportPage.assertIssueMonth(issueMonth);
});

Then(/^I can see issue year as (.*)$/, async function (issueYear) {
  const passportPage = new PassportPage(this.page);
  await passportPage.assertIssueYear(issueYear);
});

Then(
  /^I can see the Valid to date field titled (.*)$/,
  async function (validDateFieldTitle) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertValidDateFieldTitle(validDateFieldTitle);
  }
);

Then(
  /^I can see Valid to date sentence as (.*)$/,
  async function (validDateExample) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertValidDateExample(validDateExample);
  }
);

Then(/^I can see Valid To day as (.*)$/, async function (validToDay) {
  const passportPage = new PassportPage(this.page);
  await passportPage.assertValidToDay(validToDay);
});

Then(/^I can see Valid To month as (.*)$/, async function (validToMonth) {
  const passportPage = new PassportPage(this.page);
  await passportPage.assertValidToMonth(validToMonth);
});

Then(/^I can see Valid To year as (.*)$/, async function (validToYear) {
  const passportPage = new PassportPage(this.page);
  await passportPage.assertValidToYear(validToYear);
});

Then(
  /^I can see the licence number field titled (.*)$/,
  async function (validLicenceTitle) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertLicenceTitle(validLicenceTitle);
  }
);

Then(
  /^I see the Licence number sentence (.*)$/,
  async function (validLicenceExample) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertLicenceExample(validLicenceExample);
  }
);

Then(
  /^I can see the issue number field titled (.*)$/,
  async function (issueNumberTitle) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertIssueNumberTitle(issueNumberTitle);
  }
);

Then(
  /^I can see issue sentence as (.*)$/,
  async function (issueNumberSentence) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertIssueSentenceExample(issueNumberSentence);
  }
);

Then(
  /^I can see the postcode field titled (.*)$/,
  async function (postcodeTitle) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertPostcodeTitle(postcodeTitle);
  }
);

Then(
  /^I can see postcode sentence as (.*)$/,
  async function (postcodeSentence) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertPostcodeSentence(postcodeSentence);
  }
);

Then(/^I see the consent title section (.*)$/, async function (consentTitle) {
  const passportPage = new PassportPage(this.page);
  await passportPage.assertDVLAConsent(consentTitle);
});

Then(
  /^I see the DVLA Consent first sentence (.*)$/,
  { timeout: 2 * 5000 },
  async function (consentFirstSentence) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertDVLAConsentSentenceOne(consentFirstSentence);
  }
);

Then(
  /^I see the DVLA Consent second sentence (.*)$/,
  { timeout: 2 * 5000 },
  async function (consentSecondSentence) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertDVLAConsentSentenceTwo(
      consentSecondSentence
    );
  }
);

Then(
  /^I see One Login privacy notice link (.*)$/,
  async function (consentOneLoginLink) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertConsentOneLoginLink(consentOneLoginLink);
  }
);

Then(
  /^I see DVLA privacy notice link (.*)$/,
  async function (consentPrivacyLink) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertConsentPrivacyLink(consentPrivacyLink);
  }
);

Then(
  /^I can see Check your details as (.*)$/,
  async function (checkDetailsTitle) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertRetryTitle(checkDetailsTitle);
  }
);

Then(/^I see error word as (.*)$/, async function (errorPrefix) {
  const passportPage = new PassportPage(this.page);
  await passportPage.assertErrorPrefix(errorPrefix);
});

Then(
  /^I see Check your details as (.*)$/,
  async function (errorSummaryMessage) {
    const passportPage = new PassportPage(this.page);
    await passportPage.assertYouWillBeAbleToFindSentence(
      errorSummaryMessage
    );
  }
);

//########### Text Content Comparisions - DVA ##############

Then(
  /^I see the heading (.*)$/,
  { timeout: 2 * 5000 },
  async function (pageHeadingDVA) {
    const passportPage = new DVADetailsEntryPage(this.page);
    await passportPage.assertDVAPageHeading(pageHeadingDVA);
  }
);

Then(/^I see sentence (.*)$/, async function (pageHeadingDVASentence) {
  const passportPage = new DVADetailsEntryPage(this.page);
  await passportPage.assertDVAPageHeadingSentence(
    pageHeadingDVASentence
  );
});

Then(
  /^I see We will check your details as (.*)$/,
  async function (dVAPageSentence) {
    const passportPage = new DVADetailsEntryPage(this.page);
    await passportPage.assertdvaPageSentenceTwo(dVAPageSentence);
  }
);

Then(/^I check the page title (.*)$/, async function (dvaPageTitle) {
  const passportPage = new DVADetailsEntryPage(this.page);
  await passportPage.assertDVAPageTitle(dvaPageTitle);
});

Then(
  /^I can see the DVA DoB fields titled (.*)$/,
  async function (dobFieldTitle) {
    const passportPage = new DVADetailsEntryPage(this.page);
    await passportPage.assertDVADoBFieldTitle(dobFieldTitle);
  }
);

Then(/^I can see DVA DoB example DVA as (.*)$/, async function (dobExample) {
  const passportPage = new DVADetailsEntryPage(this.page);
  await passportPage.assertDVADobExample(dobExample);
});

Then(/^I can see DVA day as (.*)$/, async function (day) {
  const passportPage = new DVADetailsEntryPage(this.page);
  await passportPage.assertDVADay(day);
});

Then(/^I can see DVA month as (.*)$/, async function (month) {
  const passportPage = new DVADetailsEntryPage(this.page);
  await passportPage.assertDVAMonth(month);
});

Then(/^I can see DVA year as (.*)$/, async function (year) {
  const passportPage = new DVADetailsEntryPage(this.page);
  await passportPage.assertDVAYear(year);
});

Then(
  /^I see the DVA Issue date field titled (.*)$/,
  async function (issueFieldTitle) {
    const passportPage = new DVADetailsEntryPage(this.page);
    await passportPage.assertDVAIssueDateFieldTitle(issueFieldTitle);
  }
);

Then(
  /^I see DVA date section example as (.*)$/,
  async function (issueDateExample) {
    const passportPage = new DVADetailsEntryPage(this.page);
    await passportPage.assertDVAIssueDateExample(issueDateExample);
  }
);

Then(/^I can see DVA Issue day as (.*)$/, async function (issueDay) {
  const passportPage = new DVADetailsEntryPage(this.page);
  await passportPage.assertDVAIssueDay(issueDay);
});

Then(/^I can see DVA issue month as (.*)$/, async function (issueMonth) {
  const passportPage = new DVADetailsEntryPage(this.page);
  await passportPage.assertDVAIssueMonth(issueMonth);
});

Then(/^I can see DVA issue year as (.*)$/, async function (issueYear) {
  const passportPage = new DVADetailsEntryPage(this.page);
  await passportPage.assertDVAIssueYear(issueYear);
});

Then(
  /^I can see DVA licence number field titled as (.*)$/,
  async function (validLicenceTitle) {
    const passportPage = new DVADetailsEntryPage(this.page);
    await passportPage.assertDVALicenceTitle(validLicenceTitle);
  }
);

Then(
  /^I see the DVA licence sentence as (.*)$/,
  async function (validLicenceExample) {
    const passportPage = new DVADetailsEntryPage(this.page);
    await passportPage.assertDVALicenceExample(validLicenceExample);
  }
);

Then(
  /^I see the DVA Consent first sentence (.*)$/,
  { timeout: 2 * 5000 },
  async function (consentFirstSentence) {
    const passportPage = new DVADetailsEntryPage(this.page);
    await passportPage.assertDVAConsentSentenceOne(consentFirstSentence);
  }
);

Then(
  /^I see the DVA Consent second sentence (.*)$/,
  { timeout: 2 * 5000 },
  async function (consentSecondSentence) {
    const passportPage = new DVADetailsEntryPage(this.page);
    await passportPage.assertDVAConsentSentenceTwo(
      consentSecondSentence
    );
  }
);

Then(
  /^I see DVA privacy notice link (.*)$/,
  async function (consentPrivacyLink) {
    const passportPage = new DVADetailsEntryPage(this.page);
    await passportPage.assertDVAConsentPrivacyLink(consentPrivacyLink);
  }
);

Then(
  /^I see DVA One Login privacy notice link (.*)$/,
  async function (consentOneLoginLink) {
    const passportPage = new DVADetailsEntryPage(this.page);
    await passportPage.assertDVAConsentOneLoginLink(consentOneLoginLink);
  }
);
