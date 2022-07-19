const express = require("express");
const wizard = require("hmpo-form-wizard");

const steps = require("./steps");
const fields = require("./fields");
const { proveAnotherWay } = require("./middleware");

const router = express.Router();

const wizardOptions = {
  name: "cri-passport-front",
  journeyName: "passport",
  templatePath: "passport",
};

router.get("/prove-another-way", proveAnotherWay);
router.use(wizard(steps, fields, wizardOptions));

module.exports = router;
