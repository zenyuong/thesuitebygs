const router = require("express").Router();
const axios = require("axios");
const CreditCardTransactions = require("../models/CreditCardTransactions");

module.exports = () => {
  router.post("/register-credit-card-services", (req, res) => {
    const response = "Insertion query to Mongo with form data";
    return res.send({ ok: true, msg: "Credit Card System Registered" });
  });

  router.get("/view-credit-card-transactions", (req, res) => {
    const transactions = "Query from Mongo";
    return res.send({ ok: true, msg: "Transactions Fetched", transactions });
  });

  return router;
};
