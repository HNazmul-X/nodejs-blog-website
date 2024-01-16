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
error404(app);

//connecting to database
mongoose.connect(`mongodb+srv://USER_NAZ:t0nWvKn4djsjfqA1@cluster0.loat0zb.mongodb.net/?retryWrites=true&w=majority`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.listen(port, console.log(chalk.bgGreen.black(`your server is running port on http://localhost:${port}`)));
