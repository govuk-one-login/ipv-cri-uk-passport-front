require("dotenv").config();
require("express");
require("express-async-errors");
const session = require("express-session");
const AWS = require("aws-sdk");
const DynamoDBStore = require("connect-dynamodb")(session);
const { setup } = require("hmpo-app");

const { PORT, SESSION_SECRET, SESSION_TABLE_NAME } = require("./lib/config");
const { getGTM } = require("./lib/locals");

AWS.config.update({
  region: "eu-west-2",
});
const dynamodb = new AWS.DynamoDB();

const dynamoDBSessionStore = new DynamoDBStore({
  client: dynamodb,
  table: SESSION_TABLE_NAME,
});

const loggerConfig = {
  console: true,
  consoleJSON: true,
  app: false,
};

const sessionConfig = {
  cookieName: "cri_passport_service_session",
  secret: SESSION_SECRET,
  sessionStore: dynamoDBSessionStore,
};

const { router } = setup({
  config: { APP_ROOT: __dirname },
  port: PORT,
  logs: loggerConfig,
  session: sessionConfig,
  redis: false,
  urls: {
    public: "/public",
  },
  publicDirs: ["../dist/public"],
  dev: true,
  middlewareSetupFn: (app) => {
    app.use(function (req, res, next) {
      req.headers["x-forwarded-proto"] = "https";
      next();
    });
  },
});

router.use(getGTM);
router.use("/oauth2", require("./app/oauth2/router"));
router.use("/passport", require("./app/passport/router"));
