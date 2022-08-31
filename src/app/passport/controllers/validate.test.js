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
    const setup = setupDefaultMocks();
    req = setup.req;
    res = setup.res;
    next = setup.next;

    req.session.JWTData = { authParams: {}, user_id: "a-users-id" };
    req.session.id = "some-session-id";
  });
  afterEach(() => sandbox.restore());

  it("should be an instance of BaseController", () => {
    expect(validate).to.be.an.instanceof(BaseController);
  });

  it("should retrieve redirect url from cri-passport-back and store in session", async () => {
    const passportSessionId = "passport123";

    req.sessionModel.set("passportNumber", "123456789");
    req.session.passportSessionId = passportSessionId;
    req.sessionModel.set("surname", "Jones Smith");
    req.sessionModel.set("firstName", "Dan");
    req.sessionModel.set("middleNames", "Joe");
    req.sessionModel.set("dateOfBirth", "10/02/1975");
    req.sessionModel.set("expiryDate", "15/01/2035");

    const data = {
      client: {
        redirectUrl:
          "https://client.example.com/cb?id=PassportIssuer&code=1234",
      },
    };

    const resolvedPromise = new Promise((resolve) => resolve({ data }));
    sandbox.stub(axios, "post").returns(resolvedPromise);

    await validate.saveValues(req, res, next);

    sandbox.assert.calledWith(
      axios.post,
      sinon.match("/check-passport"),
      {
        passportNumber: "123456789",
        surname: "Jones Smith",
        forenames: ["Dan", "Joe"],
        dateOfBirth: "10/02/1975",
        expiryDate: "15/01/2035",
      },
      {
        headers: {
          passport_session_id: passportSessionId,
        },
      }
    );
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

  it("should set an error object in the session if redirect url is missing", async () => {
    req.sessionModel.set("passportNumber", "123456789");
    req.sessionModel.set("surname", "Jones Smith");
    req.sessionModel.set("firstName", "Dan");
    req.sessionModel.set("middleNames", "Joe");
    req.sessionModel.set("dateOfBirth", "10/02/1975");
    req.sessionModel.set("expiryDate", "15/01/2035");

    const data = {
      invalidData: {
        value: "test invalid data",
      },
    };
    const resolvedPromise = new Promise((resolve) => resolve({ data }));
    sandbox.stub(axios, "post").returns(resolvedPromise);

    await validate.saveValues(req, res, next);

    const sessionError = req.sessionModel.get("error");
    expect(sessionError.error).to.eq("server_error");
    expect(sessionError.error_description).to.eq(
      "Failed to retrieve authorization redirect url"
    );
  });

  it("should save error in session when error caught from cri-back", async () => {
    req.sessionModel.set("passportNumber", "123456789");
    req.sessionModel.set("surname", "Jones Smith");
    req.sessionModel.set("firstName", "Dan");
    req.sessionModel.set("middleNames", "Joe");
    req.sessionModel.set("dateOfBirth", "10/02/1975");
    req.sessionModel.set("expiryDate", "15/01/2035");

    const testError = {
      name: "Test error name",
      response: {
        data: {
          code: "access_denied",
          error_description: "Permission denied to token endpoint",
        },
      },
    };
    const resolvedPromise = new Promise((resolve, error) => error(testError));
    sandbox.stub(axios, "post").returns(resolvedPromise);

    await validate.saveValues(req, res, next);

    const sessionError = req.sessionModel.get("error");
    expect(sessionError.code).to.eq(testError.response.data.code);
    expect(sessionError.error_description).to.eq(
      testError.response.data.error_description
    );
  });

  it("should set showRetryMessage to true to show retry message", async () => {
    req.sessionModel.set("passportNumber", "123456789");
    req.sessionModel.set("surname", "Jones Smith");
    req.sessionModel.set("firstName", "Dan");
    req.sessionModel.set("middleNames", "Joe");
    req.sessionModel.set("dateOfBirth", "10/02/1975");
    req.sessionModel.set("expiryDate", "15/01/2035");

    const data = {
      result: "retry",
    };

    const resolvedPromise = new Promise((resolve) => resolve({ data }));
    sandbox.stub(axios, "post").returns(resolvedPromise);

    await validate.saveValues(req, res, next);

    const showRetryMessage = req.sessionModel.get("showRetryMessage");
    expect(showRetryMessage).to.equal(true);
    expect(next).to.have.been.calledOnce;
  });

  it("should go to details on retry", async () => {
    req.sessionModel.set("passportNumber", "123456789");
    req.sessionModel.set("surname", "Jones Smith");
    req.sessionModel.set("firstName", "Dan");
    req.sessionModel.set("middleNames", "Joe");
    req.sessionModel.set("dateOfBirth", "10/02/1975");
    req.sessionModel.set("expiryDate", "15/01/2035");

    const data = {
      result: "retry",
    };

    const resolvedPromise = new Promise((resolve) => resolve({ data }));
    sandbox.stub(axios, "post").returns(resolvedPromise);
    await validate.saveValues(req, res, next);

    const result = validate.next(req);
    expect(result).to.eq("details");
  });

  it("should call callback if retry not set", async () => {
    req.sessionModel.set("passportNumber", "123456789");
    req.sessionModel.set("surname", "Jones Smith");
    req.sessionModel.set("firstName", "Dan");
    req.sessionModel.set("middleNames", "Joe");
    req.sessionModel.set("dateOfBirth", "10/02/1975");
    req.sessionModel.set("expiryDate", "15/01/2035");

    const data = {
      result: "",
    };

    const resolvedPromise = new Promise((resolve) => resolve({ data }));
    sandbox.stub(axios, "post").returns(resolvedPromise);
    await validate.saveValues(req, res, next);

    const result = validate.next(req);
    expect(result).to.eq("/oauth2/callback");
  });
});
