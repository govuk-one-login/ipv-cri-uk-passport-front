const proxyquire = require("proxyquire");

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

  beforeEach(() => {
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
