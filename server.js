const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./db");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

connectDB();

const userRouter = require("./Routes").user;
const orderRouter = require("./Routes").order;
const dishRouter = require("./Routes").dish;

app.use("/upload", express.static(`upload`));
app.use("/user", userRouter);
app.use("/order", orderRouter);
app.use("/dish", dishRouter);

app.use((req, res, next) => {
  res.status(404);
  next({
    status: 404,
    message: "404 page not found",
  });
});

/**
 * Error Handling Middleware
 */
app.use((err, req, res, next) => {
  res.status(err.status || 400);
  res.json({
    status: err.status,
    message: err.message,
  });
});

app.listen(port, (req, res) => {
  console.log(`Server listening port ${port}`);
});
