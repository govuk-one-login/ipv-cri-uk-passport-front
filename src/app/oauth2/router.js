const express = require("express");

const router = express.Router();

const {
  redirectToCallback,
  redirectToPassportDetailsPage,
  decryptJWTAuthorizeRequest,
} = require("./middleware");

router.get(
  "/authorize",
  decryptJWTAuthorizeRequest,
  redirectToPassportDetailsPage
);
router.get("/callback", redirectToCallback);

module.exports = router;
