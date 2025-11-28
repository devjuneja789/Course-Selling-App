const jwt = require("jsonwebtoken");
const {USER_JWT_SECRET} = require("../config");

function userMiddleware(req, res, next) {
    const token = req.headers.token;
    const decodeData = jwt.verify(token, USER_JWT_SECRET);

    if (decodeData) {
        req.userId = decodeData.id;
        next()
    } else {
        res.status(403).send({
            message: "You are not signed in"
        })
    }
}



module.exports = {
    userMiddleware: userMiddleware
}