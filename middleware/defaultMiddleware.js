const morgan = require("morgan");
const express = require("express")
const session = require("express-session");
const { bindUserWithRequest } = require("./authMiddleware");
const setLocals = require("./setLocals");
const MongoDbSessions = require("connect-mongodb-session")(session)

const sessionStore = new MongoDbSessions({
    uri: "mongodb://localhost:27017/BlogWithStackLearnerEJS",
    collection: "sessions",
});


exports.middleware = [

    express.static("public"),
    morgan("dev"),
    express.urlencoded({extended:true}),
    express.json(),
    session({
        secret: process.env.SECRET_KEY || "SECRET_KEY",
        resave:false,
        saveUninitialized:false,
        cookie:{
            maxAge: 1000 * 60 * 60 * 24
        },
        store:sessionStore
    }),
    bindUserWithRequest(),
    setLocals()
]