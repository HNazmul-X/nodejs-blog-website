const apiRouter = require("../API/routes/apiRoutes");
const playgroundRouter = require("../playground/play");
const { authRouter } = require("./authRouter");
const dashboardRoutes = require("./dashboardRoute");
const homeRouter = require("./homeRoutes");
const postRouter = require("./postRoute");
const searchRouter = require("./searchRouter");
const uploadRouter = require("./uploadRouter");

const routes = [
    {
        path: "/auth",
        handler: authRouter,
    },
    {
        path: "/api",
        handler: apiRouter ,
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
        path: "/search",
        handler: searchRouter,
    },
    {
        path: "/upload",
        handler: uploadRouter,
    },
    {
        path: "/",
        handler:homeRouter,
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
            app.use(route.path, route.handler)
        } 
        else{
            app.use(route.path, route.handler)
        }
    })
};
