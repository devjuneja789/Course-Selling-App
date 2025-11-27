const jwt = require("jsonwebtoken");
const { ADMIN_JWT_SECRET } = require("../config")

function adminMiddleware(req, res, next) {
    const token = req.headers.token;
    const decodeData = jwt.verify(token, ADMIN_JWT_SECRET);

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
    adminMiddleware: adminMiddleware
}