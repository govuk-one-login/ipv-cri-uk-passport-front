const BaseController = require("hmpo-form-wizard").Controller;
const DetailsController = require("./details");

describe("details controller", () => {
  const details = new DetailsController({ route: "/test" });

  it("should be an instance of BaseController", () => {
    expect(details).to.be.an.instanceOf(BaseController);
  });
});
