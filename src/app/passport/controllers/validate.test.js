const axios = require("axios");
const BaseController = require("hmpo-form-wizard").Controller;
const ValidateController = require("./validate");

describe("validate controller", () => {
  const validate = new ValidateController({ route: "/test" });

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
      render: sinon.fake(),
    };

    const sessionModelStub = sinon.stub();
    sessionModelStub.onCall(0).returns("12345678");
    sessionModelStub.onCall(1).returns("Smith");
    sessionModelStub.onCall(2).returns("John Paul");
    sessionModelStub.onCall(3).returns("12-03-1990");
    sessionModelStub.onCall(4).returns("24-01-2025");

    req = {
      query: {
        response_type: "code",
        client_id: "s6BhdRkqt3",
        state: "xyz",
        redirect_uri: "https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb",
        unusedParam: "not used",
      },
      session: {},
      sessionModel: {
        get: sessionModelStub,
      }
    };

    next = sinon.fake();
  });
  afterEach(() => sandbox.restore());

  it("should be an instance of BaseController", () => {
    expect(validate).to.be.an.instanceof(BaseController);
  });

  it("should retrieve auth code from cri-passport-back and store in session", async () => {
    const data = {
      code: {
        value: "test-auth-code-12345"
      }
    };
    const resolvedPromise = new Promise((resolve) => resolve({ data }))
    sandbox.stub(axios, 'post').returns(resolvedPromise)

    await validate.saveValues(req, res, next);

    expect(req.session.authorization_code).to.eq(data.code.value);
  });

  it("should return a 500 response if auth code is missing", async () => {
    const data = {
      invalidData: {
        value: "test invalid data"
      }
    };
    const resolvedPromise = new Promise((resolve) => resolve({ data }))
    sandbox.stub(axios, 'post').returns(resolvedPromise)

    await validate.saveValues(req, res, next);

    expect(res.status.lastArg).to.eq(500);
    expect(res.send.lastArg).to.eq("Missing authorization code");
  });

  it("should return error on request failure", async () => {
    const testError = {
      name: "Test error name"
    };
    const resolvedPromise = new Promise((resolve, error) => error(testError))
    sandbox.stub(axios, 'post').returns(resolvedPromise)

    await validate.saveValues(req, res, next);

    expect(res.error).to.eq(testError.name);
    expect(next.lastArg).to.eq(testError)
  });
});
