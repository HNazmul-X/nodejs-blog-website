const cheerio = require("cheerio");
const moment = require("moment")

module.exports = () => {
    return (req, res, next) => {
        res.locals.user = req.user;
        res.locals.isLoggedIn = req.session.isLoggedIn;
        res.locals.truncate = (html) => {
            const node = cheerio.load(html);
            let text = node.text();
            text = text.replace(/(\r\r|\n|\r)/gi, "");

            return text.length <= 100 ? text : text.substr(0, 100);
        };
        next();

        res.locals.blogCreatedMoment = (date) =>  moment(date).fromNow()
    };
};
