const chalk = require("chalk");



module.exports = app => {
    app.use((req, res, next)=> {
        {
            const error = new Error("404 Not Found");
            error.status = 404;
            next(error);
        }
    })

    app.use((error, req, res, next)=> {
        console.log(chalk.red.inverse(error.massage))
        console.log(chalk.red.inverse(error))
        if(error.status === 404){
            res.render("pages/error/error404",{flashMsg:{}})
        }
        else{
            res.render("pages/error/error500",{flashMsg:{}})
        }

    })
}