const express = require("express");

const router = express.Router();

const {
  addAuthParamsToSession,
  redirectToCallback,
  redirectToPassportDetailsPage,
} = require("./middleware");

router.get(
  "/authorize",
  addAuthParamsToSession,
  redirectToPassportDetailsPage
);
router.post("/authorize", redirectToCallback);

module.exports = router;
