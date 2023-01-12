const proxyquire = require("proxyquire");
const axios = require("axios");

const configStub = {
  AUTH_PATH: "/subsubpath/auth",
  API_BASE_URL: "https://example.org/subpath",
};
const middleware = proxyquire("./middleware", {
  "../../lib/config": configStub,
});

describe("oauth middleware", () => {
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

  describe("decryptJWTAuthorizeRequest and store oauth params in session", () => {
    const authParams = {
      response_type: "code",
      client_id: "s6BhdRkqt3",
      state: "xyz",
      redirect_uri: "https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb",
    };

    const passportSessionId = "passport123;";

    beforeEach(() => {
      req = {
        query: {
          request: "someToken",
          client_id: "s6BhdRkqt3",
        },
        session: {},
      };

      const resolvedPromise = new Promise((resolve) =>
        resolve({ data: { authParams, passportSessionId } })
      );
      sandbox.stub(axios, "post").returns(resolvedPromise);
    });

    afterEach(() => sandbox.restore());

    it("should call next", async function () {
      await middleware.decryptJWTAuthorizeRequest(req, res, next);
      expect(next).to.have.been.called;
    });

    it("should save passportSessionId to session", async function () {
      await middleware.decryptJWTAuthorizeRequest(req, res, next);
      expect(req.session.passportSessionId).to.be.equal(passportSessionId);
    });
  });

  describe("decryptJWTAuthorizeRequest store shared_claims", () => {
    const sharedClaims = {
      names: [
        { givenNames: ["Dan John"], familyName: "Watson" },
        { givenNames: ["Daniel"], familyName: "Watson" },
        { givenNames: ["Danny, Dan"], familyName: "Watson" },
      ],
      dateOfBirths: ["2021-03-01", "1991-03-01"],
    };

    beforeEach(() => {
      req = {
        query: {
          client_id: "s6BhdRkqt3",
          request:
            "eyJuYW1lcyI6W3siZ2l2ZW5OYW1lcyI6WyJEYW4iXSwiZmFtaWx5TmFtZSI6IldhdHNvbiJ9LHsiZ2l2ZW5OYW1lcyI6WyJEYW5pZWwiXSwiZmFtaWx5TmFtZSI6IldhdHNvbiJ9LHsiZ2l2ZW5OYW1lcyI6WyJEYW5ueSwgRGFuIl0sImZhbWlseU5hbWUiOiJXYXRzb24ifV0sImRhdGVPZkJpcnRocyI6WyIyMDIxLTAzLTAxIiwiMTk5MS0wMy0wMSJdfQ==",
        },
        session: {},
        sessionModel: {
          set: sinon.fake(),
        },
      };
      const resolvedPromise = new Promise((resolve) =>
        resolve({ data: { shared_claims: sharedClaims } })
      );
      sandbox.stub(axios, "post").returns(resolvedPromise);
    });

    afterEach(() => sandbox.restore());

    it("should save sharedClaims to session", async function () {
      await middleware.decryptJWTAuthorizeRequest(req, res, next);

      expect(req.session.shared_claims).to.deep.equal(sharedClaims);
    });

    it("should call next", async function () {
      await middleware.decryptJWTAuthorizeRequest(req, res, next);

      expect(next).to.have.been.called;
    });
  });

  describe("decryptJWTAuthorizeRequest error in api call", () => {
    afterEach(() => sandbox.restore());
    beforeEach(() => {
      req = {
        query: {
          request:
            "eyJuYW1lcyI6W3siZ2l2ZW5OYW1lcyI6WyJEYW4iXSwiZmFtaWx5TmFtZSI6IldhdHNvbiJ9LHsiZ2l2ZW5OYW1lcyI6WyJEYW5pZWwiXSwiZmFtaWx5TmFtZSI6IldhdHNvbiJ9LHsiZ2l2ZW5OYW1lcyI6WyJEYW5ueSwgRGFuIl0sImZhbWlseU5hbWUiOiJXYXRzb24ifV0sImRhdGVPZkJpcnRocyI6WyIyMDIxLTAzLTAxIiwiMTk5MS0wMy0wMSJdfQ==",
        },
        session: {},
        sessionModel: {
          set: sinon.fake(),
        },
      };
      sandbox.stub(axios, "post").throws(new Error());
    });

    it("should call next once", async function () {
      await middleware.decryptJWTAuthorizeRequest(req, res, next);
      expect(next).calledOnce;
    });
  });

  describe("decryptJWTAuthorizeRequest JWT missing from request", () => {
    afterEach(() => sandbox.restore());
    beforeEach(() => {
      req = {
        query: {
          request: "",
        },
        session: {
          id: "asdfghjkl",
        },
      };
    });

    it("next should be called with error message", async function () {
      await middleware.decryptJWTAuthorizeRequest(req, res, next);
      expect(next).calledOnce;

      expect(next).to.have.been.calledWith(
        sinon.match
          .instanceOf(Error)
          .and(sinon.match.has("message", "JWT Missing"))
      );
    });
  });

  describe("decryptJWTAuthorizeRequest error in api call and error contains redirect_uri", () => {
    afterEach(() => sandbox.restore());
    beforeEach(() => {
      req = {
        query: {
          request:
            "eyJuYW1lcyI6W3siZ2l2ZW5OYW1lcyI6WyJEYW4iXSwiZmFtaWx5TmFtZSI6IldhdHNvbiJ9LHsiZ2l2ZW5OYW1lcyI6WyJEYW5pZWwiXSwiZmFtaWx5TmFtZSI6IldhdHNvbiJ9LHsiZ2l2ZW5OYW1lcyI6WyJEYW5ueSwgRGFuIl0sImZhbWlseU5hbWUiOiJXYXRzb24ifV0sImRhdGVPZkJpcnRocyI6WyIyMDIxLTAzLTAxIiwiMTk5MS0wMy0wMSJdfQ==",
        },
        session: {
          id: "asdfghjkl",
        },
      };
    });

    it("should redirect using redirect_uri", async function () {
      sandbox.stub(axios, "post").throws({
        response: { data: { redirect_uri: "https://xxxx/xxx.com" } },
      });
      await middleware.decryptJWTAuthorizeRequest(req, res, next);
      expect(res.redirect).to.have.been.calledWith(`https://xxxx/xxx.com`);
    });

    it("should redirect using redirect_uri with error code", async function () {
      sandbox.stub(axios, "post").throws({
        response: {
          data: {
            redirect_uri: "https://xxxx/xxx.com",
            oauth_error: {
              error: "err",
            },
          },
        },
      });
      await middleware.decryptJWTAuthorizeRequest(req, res, next);
      expect(res.redirect).to.have.been.calledWith(
        `https://xxxx/xxx.com?error=err`
      );
    });

    it("should redirect using redirect_uri with error code and error description", async function () {
      sandbox.stub(axios, "post").throws({
        response: {
          data: {
            redirect_uri: "https://xxxx/xxx.com",
            oauth_error: {
              error: "err",
              error_description: "description",
            },
          },
        },
      });
      await middleware.decryptJWTAuthorizeRequest(req, res, next);
      expect(res.redirect).to.have.been.calledWith(
        `https://xxxx/xxx.com?error=err&error_description=description`
      );
    });

    it("should redirect using redirect_uri with error code, error description and state if present", async function () {
      sandbox.stub(axios, "post").throws({
        response: {
          data: {
            redirect_uri: "https://xxxx/xxx.com",
            state: "xyz",
            oauth_error: {
              error: "err",
              error_description: "description",
            },
          },
        },
      });
      await middleware.decryptJWTAuthorizeRequest(req, res, next);
      expect(res.redirect).to.have.been.calledWith(
        `https://xxxx/xxx.com?error=err&error_description=description&state=xyz`
      );
    });
  });

  describe("redirectToPassportDetailsPage", () => {
    it("should successfully redirects when code is valid", async function () {
      await middleware.redirectToPassportDetailsPage(req, res);

      expect(res.redirect).to.have.been.calledWith(`/passport`);
    });
  });

  describe("redirectToCallback", () => {
    beforeEach(() => {
      req = {
        session: {
          JWTData: {
            authParams: {
              redirect_uri:
                "https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb?id=PassportIssuer",
            },
          },
        },
      };
    });

    it("should successfully redirect with redirect_url stored in session", async function () {
      req.session.redirect_url =
        "https://client.example.com/cb?id=PassportIssuer&code=1234";

      await middleware.redirectToCallback(req, res);

      expect(res.redirect).to.have.been.calledWith(
        `https://client.example.com/cb?id=PassportIssuer&code=1234`
      );
    });
  });

  describe("passClientIdToJwtVerifyPostHeader", () => {
    let postStub;
    const clientId = "s6BhdRkqt3";
    beforeEach(() => {
      req = {
        query: {
          response_type: "code",
          client_id: clientId,
          state: "xyz",
          redirect_uri: "https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb",
          unusedParam: "not used",
          request:
            "eyJuYW1lcyI6W3siZ2l2ZW5OYW1lcyI6WyJEYW4iXSwiZmFtaWx5TmFtZSI6IldhdHNvbiJ9LHsiZ2l2ZW5OYW1lcyI6WyJEYW5pZWwiXSwiZmFtaWx5TmFtZSI6IldhdHNvbiJ9LHsiZ2l2ZW5OYW1lcyI6WyJEYW5ueSwgRGFuIl0sImZhbWlseU5hbWUiOiJXYXRzb24ifV0sImRhdGVPZkJpcnRocyI6WyIyMDIxLTAzLTAxIiwiMTk5MS0wMy0wMSJdfQ==",
        },
        session: { authParams: { client_id: clientId } },
        sessionModel: {
          set: sinon.fake(),
        },
      };
      const resolvedPromise = new Promise((resolve) => resolve({}));
      postStub = sandbox.stub(axios, "post").returns(resolvedPromise);
    });

    afterEach(() => sandbox.restore());

    it("should pass client_id in header", async function () {
      await middleware.decryptJWTAuthorizeRequest(req, res, next);

      expect(postStub.firstCall.args[2]?.headers?.client_id).to.be.equal(
        clientId
      );
    });
  });
});
