require("dotenv").config()
const morgan = require("morgan");
const express = require("express")
const session = require("express-session");
const { bindUserWithRequest } = require("./authMiddleware");
const setLocals = require("./setLocals");
const MongoDbSessions = require("connect-mongodb-session")(session)
const flash = require("connect-flash")

const sessionStore = new MongoDbSessions({
    uri: `mongodb+srv://USER_NAZ:t0nWvKn4djsjfqA1@cluster0.loat0zb.mongodb.net/?retryWrites=true&w=majority`,
    collection: "sessions",
});

const middleware = [

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
    setLocals(),
    flash()
    
]

exports.connectMiddleware  = app => {
    
    middleware.forEach(mid => app.use(mid))
}