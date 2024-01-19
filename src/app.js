require("express");
require("express-async-errors");

const path = require("path");
const session = require("express-session");
const AWS = require("aws-sdk");
const DynamoDBStore = require("connect-dynamodb")(session);
const wizard = require("hmpo-form-wizard");
const commonExpress = require("di-ipv-cri-common-express");

const setHeaders = commonExpress.lib.headers;
const setScenarioHeaders = commonExpress.lib.scenarioHeaders;
const setAxiosDefaults = commonExpress.lib.axios;
const { setGTM, getGTM } = require("./lib/locals");
const { setAPIConfig, setOAuthPaths } = require("./lib/settings");

const steps = require("./app/passport/steps");
const fields = require("./app/passport/fields");
const featureSets = require("./app/passport/featureSets");

const {
  API,
  APP,
  PORT,
  SESSION_SECRET,
  SESSION_TABLE_NAME,
  SESSION_TTL,
  LOG_LEVEL
} = require("./lib/config");

const { setup } = require("hmpo-app");

const loggerConfig = {
  consoleLevel: LOG_LEVEL,
  console: true,
  consoleJSON: true, // logstash json or pretty print output
  app: false,
  requestMeta: {
    sessionId: "session.sessionId"
  },
  meta: {
    sessionId: "session.sessionId"
  }
};

AWS.config.update({
  region: "eu-west-2"
});
const dynamodb = new AWS.DynamoDB();

const dynamoDBSessionStore = new DynamoDBStore({
  client: dynamodb,
  table: SESSION_TABLE_NAME
});

const sessionConfig = {
  cookieName: "service_session",
  secret: SESSION_SECRET,
  cookieOptions: { maxAge: SESSION_TTL },
  ...(SESSION_TABLE_NAME && { sessionStore: dynamoDBSessionStore })
};

const helmetConfig = require("di-ipv-cri-common-express/src/lib/helmet");

const { app, router } = setup({
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
  translation: {
    allowedLangs: ["en", "cy"],
    fallbackLang: ["en"],
    cookie: { name: "lng" }
  },
  publicImagesDirs: ["../dist/public/images"],
  views: [
    path.resolve(
      path.dirname(require.resolve("di-ipv-cri-common-express")),
      "components"
    ),
    "views"
  ],
  middlewareSetupFn: (app) => {
    app.use(setHeaders);
  },
  dev: true
});

app.get("nunjucks").addGlobal("getContext", function () {
  return {
    keys: Object.keys(this.ctx),
    ctx: this.ctx.ctx
  };
});

setAPIConfig({
  app,
  baseUrl: API.BASE_URL,
  sessionPath: API.PATHS.SESSION,
  authorizationPath: API.PATHS.AUTHORIZATION
});

setOAuthPaths({ app, entryPointPath: APP.PATHS.PASSPORT });

setGTM({
  app,
  analyticsCookieDomain: APP.ANALYTICS.COOKIE_DOMAIN,
  uaContainerId: APP.ANALYTICS.UA_CONTAINER_ID,
  isGa4Enabled: APP.ANALYTICS.GA4_ENABLED,
  ga4ContainerId: APP.ANALYTICS.GA4_CONTAINER_ID,
  gaTaxonomyLevel2: "passport"
});

router.use(getGTM);

router.use(setScenarioHeaders);
router.use(setAxiosDefaults);
router.use(featureSets);
router.use("/oauth2", commonExpress.routes.oauth2);

const wizardOptions = {
  name: "cri-uk-passport-front",
  journeyName: "passport",
  templatePath: "passport"
};

router.use(wizard(steps, fields, wizardOptions));

router.use(commonExpress.lib.errorHandling.redirectAsErrorToCallback);
