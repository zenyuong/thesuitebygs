const router = require("express").Router();
const axios = require("axios");

module.exports = () => {
  router.post("/visualise-data", (req, res) => {
    const data = "Read from xlsx file";
    return res.send({ ok: true, msg: "Data Extracted", data });
  });

  router.get("/live-market-statistics", (req, res) => {
    const statistics = "API Call";
    return res.send({ ok: true, msg: "Statistics Fetched", statistics });
  });

  return router;
};
