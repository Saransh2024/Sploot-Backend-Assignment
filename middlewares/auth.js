const jwt = require("jsonwebtoken");

const User = require("../models/User");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      try {
        if (err) {
          return res.status(401).json({statusCode:401, error: "Unauthorized!" });
        }

        const user = await User.findOne({ _id: payload._id }).select(
          "-password"
        );
        console.log(user);
        req.user = user;
        next();
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    return res.status(403).json({statusCode:403, error: "Forbidden 🛑🛑" });
  }
};
