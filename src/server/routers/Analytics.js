const router = require("express").Router();
var csv = require("fast-csv");
const multer = require("multer");

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

  router.get("/live-market-statistics", async (req, res) => {
    // const ticker  = req.body.ticker

    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    // const info = req.body.ticker
    // TODO: Replace with dynamic input
    const ticker = "AAPL";

    if (day < 10) {
      date = "0" + String(day);
    }

    if (month < 10) {
      month = "0" + String(month);
    }

    var startDate = `${String(year)}-${String(month)}-01`;
    var endDate = `${String(year)}-${String(month)}-${String(day)}`;

    // Creating the info variable
    var info = `${ticker}_${startDate}_${endDate}`;
    try {
      const url = `http://127.0.0.1:3001/getStocks/${info}`;
      const prices = await axios.get(url);
      const pricesData = prices["data"];
      console.log(pricesData);
      return res.send({ ok: true, msg: "Statistics Fetched", pricesData });
    } catch (e) {
      return res.send({ ok: false, msg: e });
    }
  });

  return router;
};
