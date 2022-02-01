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
router.post("/authorize", redirectToCallback);

module.exports = router;
