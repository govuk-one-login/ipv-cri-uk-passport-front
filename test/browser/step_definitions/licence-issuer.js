const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { LicenceIssuerPage } = require("../pages");

When(/^they (?:have )?start(?:ed)? the Passport journey$/, async function () {});

Given(/they (?:can )?see? the licence-issuer page$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);

  expect(licenceIssuerPage.isCurrentPage()).to.be.true;
});

Given(/^they (?:have )?continue(?:d)? to DL check$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);

  expect(licenceIssuerPage.isCurrentPage()).to.be.true;

  await licenceIssuerPage.continue();
});

Given(/^I click on DVLA radio button and Continue$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);

  expect(licenceIssuerPage.isCurrentPage()).to.be.true;

  await licenceIssuerPage.clickOnDVLARadioButton();
});

Given(/^I click on DVA radio button and Continue$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);

  expect(licenceIssuerPage.isCurrentPage()).to.be.true;

  await licenceIssuerPage.clickOnDVARadioButton();
});
