const createError = require("http-errors");
const express = require("express");
const productsRouter = require("./routers/products");
const usersRouter = require("./routers/users");
const ordersRouter = require("./routers/orders");
const orderItemsRouter = require("./routers/orderItems");
const logger = require("morgan");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const { Product } = require("./mongo/schemas/productSchema");
const { User } = require("./mongo/schemas/userSchema");
const { Order } = require("./mongo/schemas/orderSchema");
const { OrderItem } = require("./mongo/schemas/orderItemSchema");
const e = require (".env");

app.use(express.json());
app.use(cors());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false}));
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/orders", ordersRouter);
app.use("/orderItems", orderItemsRouter);

mongoose.connect(
    e

);

mongoose.connection
    .once("open", function () {
        console.log("Connected");
    })
    .on("error", function (error) {
        console.log("CONNECTION ERROR", error);
    });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function ( err, req, res, next) {
        res.locals.message = err.message;
        res.locals.error = req.app.get("env") === "development" ? err : {};

        res.status(err.status || 500);
        res.send("error");
});

const port = 3001;
app.listen(port, () => {
    console.log(`This app listening on port ${port}`);
});


module.exports = app;