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
mongoose
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@maincluster.cpis4.mongodb.net/Stack_Learner_BLOG_EJS?retryWrites=true&w=majority`, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
    })
    .then((res) => {
        setTimeout(() => {
            app.listen(port, console.log(chalk.bgGreen.black(`your server is running port on http://${process.env.DB_HOST}:8080`)));
        }, 100);
    });
