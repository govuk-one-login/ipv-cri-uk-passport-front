const BaseController = require("hmpo-form-wizard").Controller;
const DetailsController = require("./details");

describe("details controller", () => {
  const details = new DetailsController({ route: "/test" });

  let req;
  let res;
  let next;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    const setup = setupDefaultMocks();
    req = setup.req;
    res = setup.res;
    next = setup.next;
  });
  afterEach(() => sandbox.restore());

  it("should be an instance of BaseController", () => {
    expect(details).to.be.an.instanceOf(BaseController);
  });

  it("should clear showRetryMessage in session", async () => {
    req.sessionModel.set("showRetryMessage", true);
    req.form = {
      options: {
        dateFields: [],
      },
    };

    await details.saveValues(req, res, next);

    expect(req.sessionModel.get("showRetryMessage")).to.equal(false);
  });
});
