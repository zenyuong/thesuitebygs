const router = require("express").Router();
const axios = require("axios");
const CreditCardTransactions = require("../models/CreditCardTransactions");

module.exports = () => {
  router.post("/register-credit-card-services", async (req, res) => {
    const response = "Insertion query to Mongo with form data";
    const card = await CreditCardTransactions.create({
      name: "Name",
      description: "desc",
    });
    return res.send({ ok: true, msg: "Credit Card System Registered", card });
  });

  router.get("/view-credit-card-transactions", (req, res) => {
    const transactions = "Query from Mongo";
    return res.send({ ok: true, msg: "Transactions Fetched", transactions });
  });

  return router;
};
