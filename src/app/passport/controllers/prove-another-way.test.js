const BaseController = require("hmpo-form-wizard").Controller;
const ProveAnotherWayController = require("./prove-another-way");
const axios = require("axios");

describe("prove another way controller", () => {
  const proveAnotherWayController = new ProveAnotherWayController({
    route: "/test",
  });

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
    expect(proveAnotherWayController).to.be.an.instanceOf(BaseController);
  });

  it("should store redirect_url in session when users selects proveAnotherWay", async () => {
    const passportSessionId = "passport123";
    req.session.passportSessionId = passportSessionId;
    req.form = {
      values: {
        proveAnotherWayRadio: "proveAnotherWay",
      },
    };

    const data = {
      client: {
        redirectUrl:
          "https://client.example.com/cb?id=PassportIssuer&code=1234",
      },
    };

    const resolvedPromise = new Promise((resolve) => resolve({ data }));
    sandbox.stub(axios, "post").returns(resolvedPromise);

    await proveAnotherWayController.saveValues(req, res, next);

    sandbox.assert.calledWith(
      axios.post,
      sinon.match("/build-client-oauth-response"),
      undefined,
      {
        headers: {
          passport_session_id: passportSessionId,
        },
      }
    );
    expect(req.session.test.redirect_url).to.eq(
      "https://client.example.com/cb?id=PassportIssuer&code=1234"
    );
  });

  it("should throw an error if action is invalid", async () => {
    const passportSessionId = "passport123";
    req.session.passportSessionId = passportSessionId;
    req.form = {
      values: {
        proveAnotherWayRadio: "fake action",
      },
    };

    await proveAnotherWayController.saveValues(req, res, next);

    expect(next).to.have.been.calledWith(
      sinon.match.has(
        "message",
        "prove-another-way: Invalid action " +
          req.form.values.proveAnotherWayRadio
      )
    );
  });

  it("should not store redirect_url in session when users selects retry", async () => {
    req.session.passportSessionId = "passport123";
    req.sessionModel.set("redirect_url", "url");

    req.form = {
      values: {
        proveAnotherWayRadio: "retry",
      },
    };

    const data = {
      client: {
        redirectUrl:
          "https://client.example.com/cb?id=PassportIssuer&code=1234",
      },
    };

    const resolvedPromise = new Promise((resolve) => resolve({ data }));
    sandbox.stub(axios, "post").returns(resolvedPromise);

    await proveAnotherWayController.saveValues(req, res, next);

    expect(req.session.test.redirect_url).to.eq(undefined);
  });

  it("should return oauth url when sessionModel has a redirect_url value", () => {
    req.sessionModel.set("redirect_url", "url");
    const result = proveAnotherWayController.next(req);
    expect(result).to.eq("/oauth2/callback");
  });

  it("should return url for passport details value when sessionModel has a redirect_url value", () => {
    const result = proveAnotherWayController.next(req);
    expect(result).to.eq("/passport/details");
  });
});
