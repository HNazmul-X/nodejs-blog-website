const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { middleware } = require("./middleware/defaultMiddleware");
const { authRouter } = require("./routes/authRouter");


// // initializing application
// app.use(express.static("public"))
app.use(middleware)
app.set("view engine", "ejs")
app.use("/auth",authRouter)


//TODO: should be removed
app.use("/playground", )





//connecting to database
mongoose.connect("mongodb://localhost:27017/BlogWithStackLearnerEJS", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true });

app.get("/", (req, res) => {
    res.json({
        urls:"http://localhost:8080/auth/signup"
    })
});

app.listen(8080, console.log(`your server is running port on http://localhost:8080`));
