const FeatureSets = require("./featureSets");

describe("feature sets", () => {
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

  context("validateFeatureSet", () => {
    beforeEach(() => {
      req = {
        query: {},
        session: {},
      };
      res = {};
      next = sinon.stub();
    });

    it("should call next if featureSet is valid", async () => {
      req.query.featureSet = "F01";
      await FeatureSets(req, res, next);
      expect(req.session.featureSet).to.equal("F01");
      expect(next).to.have.been.calledOnce;
    });

    it("should throw an error if featureSet is invalid", async () => {
      req.query.featureSet = "invalid-featureset";
      await FeatureSets(req, res, next);
      expect(next).to.have.been.calledWith(
        sinon.match
          .instanceOf(Error)
          .and(sinon.match.has("message", "Invalid feature set ID"))
      );
      expect(req.session.featureSet).to.be.undefined;
    });
  });
});
