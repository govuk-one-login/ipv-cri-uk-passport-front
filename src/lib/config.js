require("dotenv").config();

const cfenv = require("cfenv");
const appEnv = cfenv.getAppEnv();
const serviceConfig = {};

if (!appEnv.isLocal) {
  serviceConfig.criPassportBackAPIUrl = appEnv.getServiceURL("cri-passport-back-api");
}

module.exports = {
  API_BASE_URL: serviceConfig.coreBackAPIUrl || process.env.API_BASE_URL,
  API_VALIDATE_PASSPORT_PATH: "/passport",
  API_JWT_VERIFICATION_PATH: "/jwt-verification",
  PORT: process.env.PORT || 3000,
  SESSION_SECRET: process.env.SESSION_SECRET,
};
