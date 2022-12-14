const router = require("express").Router();
var csv = require("fast-csv");
const multer = require("multer");
const axios = require('axios')
const CreditCard = require("../models/CreditCard");

module.exports = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
    },
  });

  const csvFilter = (req, file, cb) => {
    if (file.mimetype.includes("csv")) {
      cb(null, true);
    } else {
      cb("Please upload only csv file.", false);
    }
  };

  const upload = multer({ storage: storage, fileFilter: csvFilter });

  router.post("/visualise-data", upload.single("file"), (req, res) => {
    if (req.file == undefined) {
      return res
        .status(400)
        .send({ ok: false, msg: "Please upload a CSV file" });
    }
    let companyInfo = [];
    let filePath = `./uploads/${req.file.filename}`;
    try {
      csv
        .parseFile(filePath, { headers: true })
        .on("data", function (data) {
          companyInfo.push(data);
          console.log(data);
        })
        .on("end", function () {
          return res.send({
            ok: true,
            msg: "Data Extracted From CSV",
            companyInfo,
          });
        });
    } catch (e) {
      return res.send({ ok: false, e });
    }
  });

  router.post("/live-market-statistics", async (req, res) => {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    // TODO: #2 Uncomment Later
    const ticker  = req.body.ticker
    console.log("THIS IS THE TICKER", ticker)
    // const ticker = "AAPL";

    if (day < 10) {
      date = "0" + String(day);
    }

    if (month < 10) {
      month = "0" + String(month);
    }

    //  Concatenate the day, week and year to derive a start and end date in the format of YYYY-MM-DD
    var startDate = `${String(year)}-${String(month)}-01`;
    var endDate = `${String(year)}-${String(month)}-${String(day)}`;

    // Creating the info variable so that is can be passed into the Flask call
    var info = `${ticker}_${startDate}_${endDate}`;
    console.log(info)

    // Calling Flask function, Returns price from start of the month and current date.
    var url = `http://127.0.0.1:3001/getStocks/${info}`;
    const prices = await axios.get(url);
    const pricesData = prices["data"];
    console.log(pricesData) 

    // Checking if API call was successful
    if (prices["data"]["code"] == 200) {
      return res.send({
        ok: true,
        msg: `Stock prices fetched from ${startDate} to ${endDate}}`,
        data: pricesData,
      }); 
    } else {
      return res.send({
        ok: false,
        msg: `Stock prices not fetched from ${startDate} to ${endDate}}`,
      });
    }
  });
  // router.get("/dwad", async (req, res) => {
  //   const response = await CreditCard.create({
  //     interestRate: 0.5,
  //     annualFee: 100,
  //     balanceTransferFee: 200,
  //     signupBonus: 5000,
  //   });
  //   console.log(response);
  // });
  return router;
};
