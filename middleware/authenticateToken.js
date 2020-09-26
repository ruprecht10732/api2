const jwt = require("jsonwebtoken");
const secret = "$2y$10$VRLzUr17wvPGMxghnFH5i.3s/ApL1wsC.7OFvzedG8FSKzF.CIgfe";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  jwt.verify(token, secret, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    req.userId = decoded.id;
    next();
  });
};
module.exports = authenticateToken;
