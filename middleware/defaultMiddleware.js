const morgan = require("morgan");
const express = require("express")


exports.middleware = [

    express.static("public"),
    morgan("dev"),
    express.urlencoded({extended:true}),
    express.json(),
]