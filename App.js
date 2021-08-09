const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { middleware } = require("./middleware/defaultMiddleware");
// const { validatroRouter } = require("./Playground/palygournd"); TODO:
const { authRouter } = require("./routes/authRouter");
const dashboardRoutes = require("./routes/dashboardRoute");
const port = process.env.PORT || 8080


// // initializing application
app.use(middleware)
app.set("view engine", "ejs")
app.use("/auth",authRouter)
app.use("/dashboard", dashboardRoutes)


//TODO: should be removed
// app.use("/playground",validatroRouter )





//connecting to database
mongoose.connect("mongodb://localhost:27017/BlogWithStackLearnerEJS", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true });

app.get("/", (req, res) => {
    
    res.json({
        urls:"http://localhost:8080/auth/signup"
    })
});

app.listen(port, console.log(`your server is running port on http://localhost:8080`));
