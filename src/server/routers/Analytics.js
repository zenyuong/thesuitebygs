const router = require("express").Router();
const axios = require("axios");
var csv = require("fast-csv");
const multer = require("multer");
const fs = require("fs");

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
    console.log("hihi", req.file);

    try {
      if (req.file == undefined) {
        return res
          .status(400)
          .send({ ok: false, msg: "Please upload a CSV file" });
      }

      let companyInfo = [];
      let filePath = `./uploads/${req.file.filename}`;
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

  router.get("/live-market-statistics", (req, res) => {
    const statistics = "API Call";
    return res.send({ ok: true, msg: "Statistics Fetched", statistics });
  });

  return router;
};
