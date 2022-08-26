const router = require("express").Router();
const axios = require("axios");

module.exports = () => {
  router.get("/upcoming-public-offerings", (req, res) => {
    const companies = "Just make some data up";
    return res.send({ ok: true, msg: "Upcoming IPOs retrieved", companies });
  });

  router.get("/historical-prices", (req, res) => {
    const prices = "API Call";
    return res.send({ ok: true, msg: "Prices Fetched", prices });
  });

  router.post("/calculate-risk", (req, res) => {
    const risk = "Gather form input and calculate with formula";
    return res.send({ ok: true, msg: "Risk Calculated", risk });
  });

  return router;
};
