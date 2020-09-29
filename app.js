require("dotenv").config();
const express = require("express");
const path = require("path");
const cronjob = require("./jobs/check_complete.job.js");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const models = require("./sequelize.js");

var CronJob = require("cron").CronJob;

const app = express();

const corsOptions = {
  origin: "https://onboarding.thecallcompany.nl",
  optionsSuccessStatus: 200,
};

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors(corsOptions));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Het werkt verdomme eindelijke");
});

require("./routes/invite.routes.js")(app);
require("./routes/department.routes.js")(app);
require("./routes/user.routes.js")(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {},
  });
});

var job = new CronJob("0 0 19 * * *", cronjob.looknotaccept);
job.start();

module.exports = app;
