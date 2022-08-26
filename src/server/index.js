// Initialize our environment variables using the .env file
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileupload = require("express-fileupload");
//session for user login
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const MAX_AGE = 1000 * 60 * 15; // 15 mins

corsOptions = { origin: true, credentials: true };

// 1. Ensure database is connected
// 2. Start API server
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.DATABASE_URI,
  () => {
    console.log("[Connected to Database]");
    initAPIServer();
  },
  (e) => console.error(e)
);

// setting up connect-mongodb-session store
const mongoDBstore = new MongoDBStore({
  uri: process.env.DATABASE_URI,
  collection: "mySessions",
});

function initAPIServer() {
  const app = express();
  app.use(fileupload());
  app.use(cors(corsOptions));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(
    session({
      secret: "a1s2d3f4g5h6",
      name: "session-id", // cookies name to be put in "key" field in postman
      store: mongoDBstore,
      cookie: {
        maxAge: MAX_AGE, // this is when our cookies will expired and the session will not be valid anymore (user will be log out)
        sameSite: false,
        secure: false, // to turn on just in production
      },
      resave: true,
      saveUninitialized: false,
    })
  );

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
