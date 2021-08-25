const playgroundRouter = require("../playground/play");
const { authRouter } = require("./authRouter");
const dashboardRoutes = require("./dashboardRoute");
const postRouter = require("./postRoute");
const uploadRouter = require("./uploadRouter");

const routes = [
    {
        path: "/auth",
        handler: authRouter,
    },
    {
        path: "/dashboard",
        handler: dashboardRoutes,
    },
    {
        path: "/playground",
        handler: playgroundRouter,
    },
    {
        path: "/post",
        handler: postRouter,
    },
    {
        path: "/upload",
        handler: uploadRouter,
    },
    {
        path: "/",
        handler: (req, res) => {
            res.json({
                signupPage: "http://localhost:8080/auth/signup",
            });
        },
    },
    {
        path: "*",
        handler: (req, res) => {
            res.render("pages/error/error404",{flashMsg:{}})
        },
    },
];

exports.connectRoutes = (app) => {
    routes.forEach(route => {
        if(route.path === "/"){
            app.get(route.path, route.handler)
        } 
        else{
            app.use(route.path, route.handler)
        }
    })
};
