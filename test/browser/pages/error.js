module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  getSomethingWentWrongMessage() {
    return "Sorry, there is a problem with the service";
  }

  getErrorTitle() {
    return this.page.textContent('[data-id="error-title"]');
  }

  isCurrentPage() {
    return this.page.url() === this.url;
  }
};
