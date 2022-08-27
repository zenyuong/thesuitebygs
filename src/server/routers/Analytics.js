const router = require("express").Router();
const axios = require("axios");
var csv = require("fast-csv");

module.exports = () => {
  router.post("/visualise-data", (req, res) => {
    let companyInfo = [];

    csv
      .parseFile("./routers/upcomingPublicOffering.csv", { headers: true })
      .on("data", function (data) {
        companyInfo.push(data);
      })
      .on("end", function () {
        return res.send({
          ok: true,
          msg: "Data Extracted From CSV",
          companyInfo,
        });
      });
  });

  router.get("/live-market-statistics", (req, res) => {
    const statistics = "API Call";
    return res.send({ ok: true, msg: "Statistics Fetched", statistics });
  });

  return router;
};
