const express = require("express");
const app = express();
const morgan = require("morgan");
const userRoute = require("./routes/userRoutes");
const categorieRoute = require("./routes/categoriesRoutes");
const globelErrorController = require("./controllers/errorController");
const transactionRouter = require("./routes/transactionRoute");
const AppError = require("./utils/appError");
const compression = require("compression");

app.use(express.json());

if (process.env.NODE_ENV === "devolopment") {
  app.use(morgan("dev"));
}

app.use(compression());

app.use("/flow/ai/assignment/user", userRoute);
app.use("/flow/ai/assignment/categories", categorieRoute);
app.use("/flow/ai/assignment/transactions", transactionRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`something went worng with ${req.originalUrl}`, 404));
});

app.use(globelErrorController);

module.exports = app;
