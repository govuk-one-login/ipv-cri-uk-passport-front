const express = require("express");

const createApp = () => {
  const app = express();

  app.get("/", (req, res) => {
    res.send("UK Passport Checker");
  });

  return app;
};
module.exports = { createApp };
