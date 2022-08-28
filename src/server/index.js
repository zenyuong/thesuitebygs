// Initialize our environment variables using the .env file
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

corsOptions = { origin: true, credentials: true };

// 1. Ensure database is connected
// 2. Start API server
mongoose.connect(
  process.env.DATABASE_URI,
  () => {
    console.log("[Connected to Database]");
    initAPIServer();
  },
  (e) => console.error(e)
);

function initAPIServer() {
  const app = express();
  app.use(cors(corsOptions));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.get("/", (req, res) => {
    return res.end();
  });

  // Each category of routes should live in it's own file
  app.use("/asset-management-system", require("./routers/AMS")());
  app.use("/analytics", require("./routers/Analytics")());
  app.use("/payment", require("./routers/Payment")());

  let listener = app.listen(process.env.PORT || 8080, () => {
    console.log(`[API Server Listening on ${listener.address().port}]`);
  });
}
