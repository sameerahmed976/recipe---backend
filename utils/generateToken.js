const jwt = require("jsonwebtoken");
const generateToken = (res, userId) => {
  // console.log(process.env.SECRET_KEY);
  // console.log(process.env.JWT_SECRET);
  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};
module.exports = generateToken;
