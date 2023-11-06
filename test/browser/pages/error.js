module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  getSomethingWentWrongMessage() {
    return "    Sorry, there is a problem";
  }

  getErrorTitle() {
    return this.page.textContent('[data-page="error"]');
  }

  isCurrentPage() {
    return this.page.url() === this.url;
  }
};
