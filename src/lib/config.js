require("dotenv").config();

const cfenv = require("cfenv");
const appEnv = cfenv.getAppEnv();
const serviceConfig = {};

if (!appEnv.isLocal) {
  serviceConfig.criPassportBackAPIUrl = appEnv.getServiceURL(
    "cri-passport-back-api"
  );
}

module.exports = {
  API_BASE_URL: serviceConfig.criPassportBackAPIUrl || process.env.API_BASE_URL,
  API_AUTHORIZE_PATH: "/authorization",
  API_JWT_AUTHORIZE_REQ_PATH: "/jwt-authorization-request",
  PORT: process.env.PORT || 3000,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SESSION_TABLE_NAME: process.env.SESSION_TABLE_NAME,
  GTM_ID: process.env.GTM_ID,
  GTM_ANALYTICS_COOKIE_DOMAIN: process.env.GTM_ANALYTICS_COOKIE_DOMAIN,
};
