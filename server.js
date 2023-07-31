const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnect = require("./config/db.js");
const { errorHandler, notFound } = require("./middlewares/errorHandler.js");
const userRouter = require("./routes/routes.js");
const recipeRouter = require("./routes/recipesRoute.js");
const cookieParser = require("cookie-parser");
dotenv.config({});
const PORT = process.env.PORT || 8000;
const app = express();
const whitelist = ["http://localhost:5173", "http://127.0.0.1:5173"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
dbConnect();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use("/api/v1/users", userRouter);
app.use("/api/v1", recipeRouter);

app.get("/", (req, res) => {
  // console.log(req.cookies.jwt);

  return res.status(200).send(`Server started`);
});
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(
    `server started at the port ${PORT} on http//:localhost:${PORT}  `
  );
});
