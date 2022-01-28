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
    res = {
      status: sinon.fake(),
      redirect: sinon.fake(),
      send: sinon.fake(),
      render: sinon.fake(),
    };

    next = sinon.fake();
  });

  describe("addAuthParamsToSession", () => {
    beforeEach(() => {
      req = {
        query: {
          response_type: "code",
          client_id: "s6BhdRkqt3",
          state: "xyz",
          redirect_uri: "https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb",
          unusedParam: "not used",
        },
        session: {},
      };
    });

    it("should save authParams to session", async function () {
      await middleware.addAuthParamsToSession(req, res, next);

      expect(req.session.authParams).to.deep.equal({
        response_type: req.query.response_type,
        client_id: req.query.client_id,
        state: req.query.state,
        redirect_uri: req.query.redirect_uri,
      });
    });

    it("should call next", async function () {
      await middleware.addAuthParamsToSession(req, res, next);

      expect(next).to.have.been.called;
    });
  });

  describe("addSharedAttributesToSession", () => {
    const data = {
      claims: {
        name: ["Danny", "Dan"]
      }
    };

    beforeEach(() => {
      req = {
        query: {
          response_type: "code",
          client_id: "s6BhdRkqt3",
          state: "xyz",
          redirect_uri: "https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb",
          unusedParam: "not used",
          request: "eyJuYW1lcyI6W3siZ2l2ZW5OYW1lcyI6WyJEYW4iXSwiZmFtaWx5TmFtZSI6IldhdHNvbiJ9LHsiZ2l2ZW5OYW1lcyI6WyJEYW5pZWwiXSwiZmFtaWx5TmFtZSI6IldhdHNvbiJ9LHsiZ2l2ZW5OYW1lcyI6WyJEYW5ueSwgRGFuIl0sImZhbWlseU5hbWUiOiJXYXRzb24ifV0sImRhdGVPZkJpcnRocyI6WyIyMDIxLTAzLTAxIiwiMTk5MS0wMy0wMSJdfQ=="
        },
        session: {},
        sessionModel: {
          set: sinon.fake(),
        }
      };
      const resolvedPromise = new Promise((resolve) => resolve({data}));
      sandbox.stub(axios, 'post').returns(resolvedPromise);
    });

    afterEach(() => sandbox.restore());

    it("should save sharedAttributes to session", async function () {
      await middleware.parseSharedAttributesJWT(req, res, next);

      expect(req.sessionModel.set.lastArg).to.deep.equal(data);
    });

    it("should call next", async function () {
      await middleware.parseSharedAttributesJWT(req, res, next);

      expect(next).to.have.been.called;
    });
  });


  describe("redirectToPassportDetailsPage", () => {

    it("should successfully redirects when code is valid", async function () {
      await middleware.redirectToPassportDetailsPage(req, res);

      expect(res.redirect).to.have.been.calledWith(
        `/passport`
      );
    });
  });

  describe("redirectToCallback", () => {

    beforeEach(() => {
      req = {
        session: {
          authParams: {
            redirect_uri: "https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb?id=PassportIssuer",
          },
          authorization_code: "1234",
        },
      };
    });

    it("should successfully redirects when code is valid", async function () {
      await middleware.redirectToCallback(req, res);

      expect(res.redirect).to.have.been.calledWith(
        `https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb?id=PassportIssuer&code=1234`
      );
    });
  });
});
