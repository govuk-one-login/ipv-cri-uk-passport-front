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
    this.supportLink = this.page.locator(
      "xpath=/html/body/footer/div/div/div[1]/ul/li[5]/a"
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
    this.passportNumberFieldError = this.page.locator(
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

    this.Continue = this.page.locator('xpath=//*[@id="submitButton"]');

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

    this.passportNumberHint = this.page.locator(
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

    this.betaBannerLink = this.page.locator(
      "xpath=/html/body/div[2]/div/p/span/a"
    );

    this.errorLink = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/p[6]/a'
    );

    this.notFoundLink = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/p[5]/a'
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
    await this.passportNumber.fill(InvalidPassportNumber);
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

  async userReEntersExpiryDay(InvalidExpiryDay) {
    await this.passportValidToDay.fill(InvalidExpiryDay);
  }

  async userReEntersExpiryDayAsCurrentDatePlus(days) {
    await this.passportValidToDay.fill(moment().add(days, "days").format("DD"));
  }

  async userReEntersExpiryMonth(InvalidExpiryMonth) {
    await this.passportValidToMonth.fill(InvalidExpiryMonth);
  }

  async userReEntersExpiryYear(InvalidExpiryYear) {
    await this.passportValidToYear.fill(InvalidExpiryYear);
  }

  // Summary box errors

  async assertInvalidLastNameInErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidLastNameErrorInSummary.innerText()).to.equal(
      errorSummaryText
    );
  }

  async assertInvalidFirstNameInErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidFirstNameErrorInSummary.innerText()).to.equal(
      errorSummaryText
    );
  }

  async assertInvalidMiddleNameInErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidMiddleNamesErrorInSummary.innerText()).to.equal(
      errorSummaryText
    );
  }

  async assertInvalidPassportNumberInErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.errorSummaryBoxPassportNumber.innerText()).to.equal(
      errorSummaryText
    );
  }

  async assertInvalidExpiryInErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidValidToDateErrorInSummary.innerText()).to.equal(
      errorSummaryText
    );
  }

  async assertInvalidDoBInErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidDobErrorInSummary.innerText()).to.equal(
      errorSummaryText
    );
  }

  async assertInvalidValidToDateInErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidValidToDateErrorInSummary.innerText()).to.equal(
      errorSummaryText
    );
  }

  // Field errors

  async assertInvalidLastNameOnField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidLastNameFieldError.innerText()).to.contains(
      fieldErrorText
    );
  }

  async assertInvalidFirstNameOnField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidFirstNameFieldError.innerText()).to.contains(
      fieldErrorText
    );
  }

  async assertInvalidMiddleNameOnField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidMiddleNamesFieldError.innerText()).to.contains(
      fieldErrorText
    );
  }

  async assertInvalidExpiryOnField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidValidToDateFieldError.innerText()).to.contains(
      fieldErrorText
    );
  }

  async assertInvalidPassportNumberOnField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.passportNumberFieldError.innerText()).to.contains(
      fieldErrorText
    );
  }

  async assertInvalidDoBOnField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidDobFieldError.innerText()).to.contains(
      fieldErrorText
    );
  }

  async assertInvalidValidToDateOnField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidValidToDateFieldError.innerText()).to.contains(
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
    var textContent = await this.betaBannerReads.textContent();
    await expect(textContent.trim()).to.equal(assertBetaBannerText.trim());
  }

  async assertFooterLink() {
    await this.supportLink.click();
    await this.page.waitForTimeout(2000); //waitForNavigation and waitForLoadState do not work in this case
    let context = await this.page.context();
    let pages = await context.pages();
    expect(await pages[1].url()).to.equal(
      "https://home.account.gov.uk/contact-gov-uk-one-login"
    );
    await pages[1].close();
  }

  async assertBannerLink() {
    await this.betaBannerLink.click();
    await this.page.waitForTimeout(2000); //waitForNavigation and waitForLoadState do not work in this case
    let context = await this.page.context();
    let pages = await context.pages();
    expect(await pages[1].url()).to.equal(
      "https://home.account.gov.uk/contact-gov-uk-one-login"
    );
    expect(await pages[1].title()).to.not.equal(
      "Page not found - GOV.UK One Login"
    );
    await pages[1].close();
  }

  async assertErrorLink() {
    await this.errorLink.click();
    await this.page.waitForTimeout(2000); //waitForNavigation and waitForLoadState do not work in this case
    let context = await this.page.context();
    let pages = await context.pages();
    expect(await pages[1].url()).to.equal(
      "https://home.account.gov.uk/contact-gov-uk-one-login"
    );
    expect(await pages[1].title()).to.not.equal(
      "Page not found - GOV.UK One Login"
    );
    await pages[1].close();
  }

  async assertNotFoundLink() {
    await this.notFoundLink.click();
    await this.page.waitForTimeout(2000); //waitForNavigation and waitForLoadState do not work in this case
    let context = await this.page.context();
    let pages = await context.pages();
    expect(await pages[1].url()).to.equal(
      "https://home.account.gov.uk/contact-gov-uk-one-login"
    );
    expect(await pages[1].title()).to.not.equal(
      "Page not found - GOV.UK One Login"
    );
    await pages[1].close();
  }

  async deleteSessionCookie() {
    const cookieName = "service_session";
    const cookies = (await this.page.context().cookies()).filter(
      (cookie) => cookie.name !== cookieName
    );
    await this.page.context().clearCookies();
    await this.page.context().addCookies(cookies);
  }

  async goToPage(pageName) {
    await this.page.goto(this.page.url() + pageName);
  }
};
