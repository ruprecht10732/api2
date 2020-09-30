const nodemailer = require("nodemailer");

transporter = nodemailer.createTransport({
  service: "SendinBlue", // no need to set host or port etc.
  auth: {
    user: process.env.SIB_USER,
    pass: process.env.SIB_PASS,
  },
});

// transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   auth: {
//     user: process.env.ETHEREAL_USER,
//     pass: process.env.ETHEREAL_PASS,
//   },
// });
