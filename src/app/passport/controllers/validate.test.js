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
    const sessionId = "passport123";

    req.sessionModel.set("passportNumber", "123456789");
    req.session.tokenId = sessionId;
    req.sessionModel.set("surname", "Jones Smith");
    req.sessionModel.set("firstName", "Dan");
    req.sessionModel.set("middleNames", "Joe");
    req.sessionModel.set("dateOfBirth", "10/02/1975");
    req.sessionModel.set("expiryDate", "15/01/2035");
    req.session.authParams = {
      redirect_uri: "A VALUE",
      state: "A VALUE"
    };

    const data = {
      redirect_uri: "https://client.example.com",
      state: "TEST"
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
        expiryDate: "15/01/2035"
      },
      {
        headers: {
          session_id: sessionId
        }
      }
    );

    expect(req.session.authParams.redirect_uri).to.eq(
      "https://client.example.com"
    );
  });

  it("should add a document check routing header if a feature set has been set", async () => {
    const sessionId = "passport123";

    req.sessionModel.set("passportNumber", "123456789");
    req.session.tokenId = sessionId;
    req.sessionModel.set("surname", "Jones Smith");
    req.sessionModel.set("firstName", "Dan");
    req.sessionModel.set("middleNames", "Joe");
    req.sessionModel.set("dateOfBirth", "10/02/1975");
    req.sessionModel.set("expiryDate", "15/01/2035");
    req.session.authParams = {
      redirect_uri: "A VALUE",
      state: "A VALUE"
    };
    req.session.featureSet = "hmpoDVAD";

    const data = {
      redirect_uri: "https://client.example.com",
      state: "TEST"
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
        expiryDate: "15/01/2035"
      },
      {
        headers: {
          "document-checking-route": "dvad",
          session_id: sessionId
        }
      }
    );

    expect(req.session.authParams.redirect_uri).to.eq(
      "https://client.example.com"
    );
  });

  it("should set an error object in the session if redirect uri is missing", async () => {
    req.sessionModel.set("passportNumber", "123456789");
    req.sessionModel.set("surname", "Jones Smith");
    req.sessionModel.set("firstName", "Dan");
    req.sessionModel.set("middleNames", "Joe");
    req.sessionModel.set("dateOfBirth", "10/02/1975");
    req.sessionModel.set("expiryDate", "15/01/2035");

    const data = {
      redirect_uri: undefined,
      state: "TEST"
    };
    const resolvedPromise = new Promise((resolve) => resolve({ data }));
    sandbox.stub(axios, "post").returns(resolvedPromise);

    await validate.saveValues(req, res, next);

    const sessionError = req.sessionModel.get("error");
    expect(sessionError.error).to.eq("server_error");
    expect(sessionError.error_description).to.eq(
      "Failed to retrieve authorization redirect_uri or state"
    );
  });

  it("should set an error object in the session if state is missing", async () => {
    req.sessionModel.set("passportNumber", "123456789");
    req.sessionModel.set("surname", "Jones Smith");
    req.sessionModel.set("firstName", "Dan");
    req.sessionModel.set("middleNames", "Joe");
    req.sessionModel.set("dateOfBirth", "10/02/1975");
    req.sessionModel.set("expiryDate", "15/01/2035");

    const data = {
      redirect_uri: "http://example.com",
      state: undefined
    };
    const resolvedPromise = new Promise((resolve) => resolve({ data }));
    sandbox.stub(axios, "post").returns(resolvedPromise);

    await validate.saveValues(req, res, next);

    const sessionError = req.sessionModel.get("error");
    expect(sessionError.error).to.eq("server_error");
    expect(sessionError.error_description).to.eq(
      "Failed to retrieve authorization redirect_uri or state"
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
      result: "retry"
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
      result: "retry"
    };

    const resolvedPromise = new Promise((resolve) => resolve({ data }));
    sandbox.stub(axios, "post").returns(resolvedPromise);
    await validate.saveValues(req, res, next);

    expect(next).to.have.been.calledOnce;
  });

  it("should call callback if retry not set", async () => {
    req.sessionModel.set("passportNumber", "123456789");
    req.sessionModel.set("surname", "Jones Smith");
    req.sessionModel.set("firstName", "Dan");
    req.sessionModel.set("middleNames", "Joe");
    req.sessionModel.set("dateOfBirth", "10/02/1975");
    req.sessionModel.set("expiryDate", "15/01/2035");

    const data = {
      redirect_uri: "http://example.com",
      state: "test-state"
    };

    const resolvedPromise = new Promise((resolve) => resolve({ data }));
    sandbox.stub(axios, "post").returns(resolvedPromise);
    await validate.saveValues(req, res, next);

    const showRetryMessage = req.sessionModel.get("showRetryMessage");
    expect(showRetryMessage).to.equal(undefined);
    expect(next).to.have.been.calledOnce;
  });
});
