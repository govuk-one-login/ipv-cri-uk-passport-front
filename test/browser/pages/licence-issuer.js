const { expect: expect } = require("chai");

module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5030/licence-issuer";

    this.radioBtnDVLA = this.page.getByLabel("DVLA");
    this.radioBtnDVA = this.page.getByLabel("DVA");

    this.CTButton = this.page.locator("button", {
      hasText: " Continue ",
    });
  }

  isCurrentPage() {
    return this.page.url() === this.url;
  }

  async clickOnDVLARadioButton() {
    expect(await this.page.title()).to.equal(
      "Who was your UK driving licence issued by? – Prove your identity – GOV.UK"
    );
    await this.radioBtnDVLA.click();
    await this.CTButton.click();
  }

  async continue() {
    await this.CTButton.click();
  }

  async clickOnDVARadioButton() {
    expect(await this.page.title()).to.equal(
      "Who was your UK driving licence issued by? – Prove your identity – GOV.UK"
    );
    await this.radioBtnDVA.click();
    await this.CTButton.click();
  }
};
