const app = require("./app");
const http = require("http");
const https = require("https");

https.createServer(app).listen(process.env.PORT);
