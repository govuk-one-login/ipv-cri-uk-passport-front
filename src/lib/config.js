require("dotenv").config();

module.exports = {
  API: {
    BASE_URL: process.env.API_BASE_URL || "http://localhost:5007/",
    PATHS: {
      SESSION: "session",
      CHECK: "check-passport",
      AUTHORIZATION: "authorization"
    }
  },
  APP: {
    BASE_URL: process.env.API_BASE_URL || "http://localhost:5050/",
    PATHS: {
      PASSPORT: "/"
    },
    GTM: {
      GA4_ID: process.env.GOOGLE_ANALYTICS_4_GTM_CONTAINER_ID || "GTM-XXXXXXX",
      UA_ID: process.env.UNIVERSAL_ANALYTICS_GTM_CONTAINER_ID || "UA-XXXXXXX",
      ANALYTICS_COOKIE_DOMAIN: process.env.ANALYTICS_DOMAIN || "localhost",
      GA4_DISABLED: process.env.GA4_DISABLED || false,
      UA_DISABLED: process.env.UA_DISABLED || true
    }
  },
  PORT: process.env.PORT || 5050,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SESSION_TABLE_NAME: process.env.SESSION_TABLE_NAME,
  SESSION_TTL: process.env.SESSION_TTL || 7200000, // two hours in ms
  LOG_LEVEL: process.env.LOG_LEVEL || "request",
  REDIS: {
    SESSION_URL: process.env.REDIS_SESSION_URL,
    PORT: process.env.REDIS_PORT || 6379
  }
};
