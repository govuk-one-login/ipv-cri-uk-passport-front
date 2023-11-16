const RootController = require("./root");
const { Controller: BaseController } = require("hmpo-form-wizard");

describe("root controller", () => {
  const root = new RootController({ route: "/test" });

  let req;
  let res;
  let next;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    res = {
      status: sinon.fake(),
      redirect: sinon.fake(),
      send: sinon.fake(),
      render: sinon.fake()
    };

    req = {
      query: {
        client_id: "s6BhdRkqt3"
      },
      session: {
        shared_claims: {
          names: [
            { givenNames: ["Dan John"], familyName: "Watson" },
            { givenNames: ["Daniel"], familyName: "Watson" },
            { givenNames: ["Danny, Dan"], familyName: "Watson" }
          ],
          dateOfBirths: ["2021-03-01", "1991-03-01"]
        }
      },
      sessionModel: {
        get: sinon.fake(),
        set: sinon.fake(),
        unset: sinon.fake()
      },
      journeyModel: {
        set: sinon.fake()
      },
      form: {}
    };

    next = sinon.fake();
  });
  afterEach(() => sandbox.restore());

  it("should be an instance of BaseController", () => {
    expect(root).to.be.an.instanceof(BaseController);
  });

  it("should retrieve shared_claims from session and store it in the journeyModel", async () => {
    await root.saveValues(req, res, next);

    expect(req.journeyModel.set.getCall(0).args[0]).to.eq("surname");
    expect(req.journeyModel.set.getCall(0).args[1]).to.eq(
      req.session.shared_claims.names[0].familyName
    );

    expect(req.journeyModel.set.getCall(1).args[0]).to.eq("givenNames");
    expect(req.journeyModel.set.getCall(1).args[1]).to.eq(
      req.session.shared_claims.names[0].givenNames
    );

    expect(req.journeyModel.set.getCall(2).args[0]).to.eq("dateOfBirth");
    expect(req.journeyModel.set.getCall(2).args[1]).to.eq(
      req.session.shared_claims.dateOfBirths[0]
    );
  });

  it("should not update journeyModel if no shared attributes present", async () => {
    req.session.shared_claims = {
      names: [],
      dateOfBirths: []
    };

    await root.saveValues(req, res, next);

    expect(req.journeyModel.set.called).to.be.false;
  });
});
