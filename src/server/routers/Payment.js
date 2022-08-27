const router = require("express").Router();
const axios = require("axios");
const CreditCardTransactions = require("../models/CreditCardTransactions");
const UpcomingListings = require("../models/UpcomingListings");
var csv = require("fast-csv");

module.exports = () => {
  router.post("/register-credit-card-services", async (req, res) => {
    const response = "Insertion query to Mongo with form data";

    // const card = await CreditCardTransactions.create({
    //   name: "Name",
    //   description: "desc",
    // });

    return res.send({ ok: true, msg: "Credit Card System Registered" });
  });

  router.get("/view-credit-card-transactions", (req, res) => {
    const transactions = "Query from Mongo";
    const filter = "week";

    return res.send({ ok: true, msg: "Transactions Fetched", transactions });
  });

  router.get("/temp", (req, res) => {
    csv
      .parseFile("./routers/upcomingPublicOffering.csv", { headers: true })
      .on("data", function (data) {
        console.log(data);
        var details = new UpcomingListings(data);
        details.save(function (saveErr, savedetail) {
          if (saveErr) {
            console.log(saveErr);
          }
        });
      })
      .on("end", function () {
        console.log("done");
      });
  });
  return router;
};
