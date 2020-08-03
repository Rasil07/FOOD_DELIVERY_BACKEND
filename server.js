const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./Service/authRoutes");
require("dotenv").config();
const cors = require("cors");

const uri = process.env.uri;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Mongoose database connected");
});
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.listen(port, (req, res) => {
  console.log(`Server listening port ${port}`);
});

const userRouter = require("./Routes/user.routes");
const orderRouter = require("./Routes/order.routes");
const dishRouter = require("./Routes/dish.routes");

app.use("/user", userRouter);
app.use("/order", orderRouter);
app.use("/dish", authRoutes, dishRouter);
