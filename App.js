require("dotenv").config();
const chalk = require("chalk");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { connectMiddleware } = require("./middleware/defaultMiddleware");
const error404 = require("./routes/error");
const { connectRoutes } = require("./routes/Routes");
const port = process.env.PORT || 8080;

// // initializing application
connectMiddleware(app);

//setting view engine with application
app.set("view engine", "ejs");

//setting routes
connectRoutes(app);
error404(app)

//connecting to database
mongoose.connect("mongodb://localhost:27017/BlogWithStackLearnerEJS", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }).then((res) => {
    app.listen(port, console.log(chalk.bgGreen.black(`your server is running port on http://${process.env.DB_HOST}:8080`)));
});
