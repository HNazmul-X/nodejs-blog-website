const express = require("express");
const app = express();
const mongoose = require("mongoose");

// initializing application
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

//connecting to database
mongoose.connect("mongodb://localhost:27017/BlogWithStackLearner", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true });

app.get("/", (req, res) => {
    res.json({
        massage: "this is my server... for LIF",
    });
});

app.listen(8080, console.log(`your server is running port on http://localhost:8080`));
