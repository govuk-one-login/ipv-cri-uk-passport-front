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
  addAuthParamsToSession,
  parseSharedAttributesJWT,
  redirectToPassportDetailsPage
);
router.post("/authorize", redirectToCallback);

module.exports = router;
