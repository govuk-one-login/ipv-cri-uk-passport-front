const BaseController = require("hmpo-form-wizard").Controller;
const DoneController = require("./done");

describe("done controller", () => {
  const done = new DoneController({ route: "/test" });

  let req;
  let res;
  let next;
  let sandbox;

  const sessionModelJson = {
    passportNumber: "12345678",
    surname: "Smith",
    givenNames: ["John", "Paul"],
    dateOfBirth: "12-03-1990",
    expiryDate: "24-01-2025",
    "csrf-secret": "secret"
  }

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    res = {
      status: sinon.fake(),
      redirect: sinon.fake(),
      send: sinon.fake(),
      render: sinon.fake(),
    };

    const sessionModelStub = sinon.stub();
    sessionModelStub.returns(sessionModelJson);

    req = {
      query: {
        response_type: "code",
        client_id: "s6BhdRkqt3",
        state: "xyz",
        redirect_uri: "https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb",
        unusedParam: "not used",
      },
      session: {
        authorization_code: "test-auth-code-12345"
      },
      sessionModel: {
        toJSON: sessionModelStub,
      }
    };

    next = sinon.fake();
  });
  afterEach(() => sandbox.restoreContext());

  it("should be an instance of BaseController", () => {
    expect(done).to.be.an.instanceof(BaseController);
  });

  it("should set all the sent details to the locals object", () => {
    done.locals(req, res, next);

    expect(next.calledOnce).to.be.true;

    expect(next.firstCall.args[1].sentValuesSummaryList[0].key.text).to.eq("passportNumber");
    expect(next.firstCall.args[1].sentValuesSummaryList[0].value.text).to.eq(sessionModelJson.passportNumber);

    expect(next.firstCall.args[1].sentValuesSummaryList[1].key.text).to.eq("surname");
    expect(next.firstCall.args[1].sentValuesSummaryList[1].value.text).to.eq(sessionModelJson.surname);

    expect(next.firstCall.args[1].sentValuesSummaryList[2].key.text).to.eq("givenNames");
    expect(next.firstCall.args[1].sentValuesSummaryList[2].value.text).to.eq(sessionModelJson.givenNames);

    expect(next.firstCall.args[1].sentValuesSummaryList[3].key.text).to.eq("dateOfBirth");
    expect(next.firstCall.args[1].sentValuesSummaryList[3].value.text).to.eq(sessionModelJson.dateOfBirth);

    expect(next.firstCall.args[1].sentValuesSummaryList[4].key.text).to.eq("expiryDate");
    expect(next.firstCall.args[1].sentValuesSummaryList[4].value.text).to.eq(sessionModelJson.expiryDate);
  });

  it("should set all the response details to the locals object", () => {
    done.locals(req, res, next);

    expect(next.calledOnce).to.be.true;

    expect(next.firstCall.args[1].responseValuesSummaryList[0].key.text).to.eq("code");
    expect(next.firstCall.args[1].responseValuesSummaryList[0].value.text).to.eq("test-auth-code-12345");
  });
});
