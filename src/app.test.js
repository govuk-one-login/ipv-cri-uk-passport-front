const path = require("path");
const commonExpress = require("@govuk-one-login/di-ipv-cri-common-express");

const {
  API,
  APP,
  PORT,
  SESSION_SECRET,
  SESSION_TABLE_NAME,
  SESSION_TTL,
  LOG_LEVEL
} = require("./lib/config");

describe("app", () => {
  beforeEach(() => {
    setup = sinon.stub();
    setGTM = sinon.stub();
    app = sinon.stub();
    AWS = {
      DynamoDB: sinon.stub(),
      config: {
        update: sinon.stub()
      }
    };
    DynamoDBStore = sinon.stub();
  });

  afterEach(() => {
    console.log("TEST COMPLETE");
  });

  describe("setup app", () => {
    it("should set App", () => {
      const loggerConfig = {
        consoleLevel: LOG_LEVEL,
        console: true,
        consoleJSON: true,
        app: false
      };

      AWS.config.update({
        region: "eu-west-2"
      });
      const dynamodb = new AWS.DynamoDB();

      const dynamoDBSessionStore = new DynamoDBStore({
        client: dynamodb,
        table: SESSION_TABLE_NAME
      });

      const helmetConfig = commonExpress.lib.helmet;

      const sessionConfig = {
        cookieName: "service_session",
        secret: SESSION_SECRET,
        cookieOptions: { maxAge: SESSION_TTL },
        ...(SESSION_TABLE_NAME && { sessionStore: dynamoDBSessionStore })
      };

      let options = {
        config: { APP_ROOT: __dirname },
        port: PORT,
        logs: loggerConfig,
        session: sessionConfig,
        helmet: helmetConfig,
        redis: SESSION_TABLE_NAME ? false : commonExpress.lib.redis(),
        urls: {
          public: "/public",
          publicImages: "/public/images"
        },
        publicDirs: ["../dist/public"],
        publicImagesDirs: ["../dist/public/images"],
        translation: {
          allowedLangs: ["en", "cy"],
          fallbackLang: ["en"],
          cookie: { name: "lng" }
        },
        views: [
          path.resolve(
            path.dirname(
              require.resolve("@govuk-one-login/di-ipv-cri-common-express")
            ),
            "components"
          ),
          "views"
        ],
        middlewareSetupFn: (app) => {
          app.use(setHeaders);
        },
        dev: true
      };

      setup(options);

      expect(setup).to.have.been.calledWithExactly(options);
      sinon.assert.calledWith(setup, sinon.match.has("port", 5050));
    });

    it("should set GTM variables", () => {
      let options = {
        app,
        ga4ContainerId: APP.GTM.GA4_ID,
        uaContainerId: APP.GTM.UA_ID,
        analyticsCookieDomain: APP.GTM.ANALYTICS_COOKIE_DOMAIN,
        ga4Disabled: APP.GTM.GA4_DISABLED,
        uaDisabled: APP.GTM.UA_DISABLED
      };

      setGTM(options);

      expect(setGTM).to.have.been.calledWithExactly(options);
      sinon.assert.calledWith(
        setGTM,
        sinon.match.has("ga4ContainerId", "GTM-XXXXXXX")
      );
      sinon.assert.calledWith(
        setGTM,
        sinon.match.has("uaContainerId", "UA-XXXXXXX")
      );
      sinon.assert.calledWith(
        setGTM,
        sinon.match.has("analyticsCookieDomain", "localhost")
      );
      sinon.assert.calledWith(setGTM, sinon.match.has("ga4Disabled", false));
      sinon.assert.calledWith(setGTM, sinon.match.has("uaDisabled", true));
    });
  });
});
