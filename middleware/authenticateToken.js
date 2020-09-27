const jwt = require("jsonwebtoken");
const secret = process.env.SECRETKEY;

const authenticateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secret);
    next();
  } catch (error) {
    res.status(401).json({ message: "No token provided" });
  }
};

module.exports = authenticateToken;
