const router = require("express").Router();
const axios = require("axios");
const UpcomingListings = require("../models/UpcomingListings");

module.exports = () => {
  router.get("/upcoming-public-offerings", async (req, res) => {
    try {
      const upcomingPublicOfferings = await UpcomingListings.find({
        listingDate: { $gt: Date.now() },
      })
        .sort({
          listingDate: 1,
        })
        .limit(30);

      console.log(upcomingPublicOfferings);
      return res.send({
        ok: true,
        msg: "Upcoming IPOs retrieved",
        upcomingPublicOfferings,
      });
    } catch (e) {
      return res.send({ ok: false, e });
    }
  });

  router.get("/historical-prices", async (req, res) => {
    // const info = req.body.info
    const info = 'AAPL_2021-07-22_2021-08-22'
    var url = `http://127.0.0.1:3001/getStocks/${info}`;
    const prices = await axios.get(url);
    const pricesData = prices["data"];

    if (prices['data']['code'] != 200){
      return res.send({
        ok:false, 
        msg:prices['data']['message']
      })
    }
    else{
      return res.send({ ok: true, msg: "Prices Fetched", pricesData });
    }
  });

  router.post("/calculate-risk", (req, res) => {
    try {
      const { estimatedProfitPerShare, numberOfShares, initialInvestment } =
        req.body;
      const risk =
        (estimatedProfitPerShare * numberOfShares) / initialInvestment;
      return res.send({ ok: true, msg: "Risk / Reward Ratio: ", risk });
    } catch (e) {
      return res.send({ ok: false, e });
    }
  });

  return router;
};
