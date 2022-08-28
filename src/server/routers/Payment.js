const router = require("express").Router();
const axios = require("axios");
const CreditCardTransactions = require("../models/CreditCardTransactions");
const UpcomingListings = require("../models/UpcomingListings");
const CreditCard = require("../models/CreditCard");

module.exports = () => {
  router.post("/view-card-details", async (req, res) => {
    console.log(req.body);
    const card = await CreditCard.findOne();

    return res.send({
      ok: true,
      msg: "Credit Card Details Fetched",
      card,
    });
  });

  router.post("/update-card-details", async (req, res) => {
    console.log(req.body);
    const { id, interestRate, annualFee, balanceTransferFee, signupBonus } =
      req.body.cardDetails;
    try {
      const response = await CreditCard.findOneAndUpdate(
        { id: id },
        {
          interestRate: interestRate,
          annualFee: annualFee,
          balanceTransferFee: balanceTransferFee,
          signupBonus: signupBonus,
        }
      );
      return res.send({ ok: true, response });
    } catch (e) {
      return res.send({ ok: false, e });
    }
  });
  router.post("/view-credit-card-transactions", async (req, res) => {
    const { filter } = req.body;
    let query;

    switch (filter) {
      case "week":
        query = {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear() - 1,
          day: { $gt: new Date().getDate() - 7, $lt: new Date().getDate() },
        };
        console.log("1");
        break;
      case "month":
        query = {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear() - 1,
        };
        console.log("2");
        break;
      default:
        query = {
          year: new Date().getFullYear() - 1,
        };
        console.log("3");
        break;
    }
    try {
      const transactions = await CreditCardTransactions.aggregate([
        {
          $project: {
            userId: "$userId",
            transactionAmount: "$transactionAmount",

            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
        },
        {
          $match: query,
        },
      ]);
      console.log(transactions);
      return res.send({ ok: true, msg: "Transactions Fetched", transactions });
    } catch (e) {
      return res.send({ ok: false, e });
    }
  });

  return router;
};
