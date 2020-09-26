const app = require("./app");
const http = require("http");
const https = require("https");

// https.createServer(app).listen(process.env.PORT);

if (typeof PhusionPassenger !== "undefined") {
  app.listen("passenger");
} else {
  app.listen(3000);
}
