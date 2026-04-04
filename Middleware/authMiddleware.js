const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: "No token, access denied" });
  }

  try {
    token = token.split(" ")[1]; // Bearer token

    const decoded = jwt.verify(token, "secretkey");

    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = protect;

