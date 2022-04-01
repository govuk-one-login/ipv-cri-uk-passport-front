const express = require("express");

const router = express.Router();

const {
  addAuthParamsToSession,
  redirectToCallback,
  redirectToPassportDetailsPage,
  parseSharedAttributesJWT,
} = require("./middleware");

router.get(
  "/authorize",
  parseSharedAttributesJWT,
  addAuthParamsToSession,
  redirectToPassportDetailsPage
);
router.get("/callback", redirectToCallback);

module.exports = router;
