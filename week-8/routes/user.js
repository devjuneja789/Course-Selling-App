const express = require("express");
const UserRouter = express.Router();
const { UsersModel } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "random";
const bcrypt = require("bcrypt");
const { z } = require("zod");


UserRouter.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

UserRouter.post("/signup", async function (req, res) {
    const requireBody = z.object({   // input validation
        email: z.email(),
        password: z.string(),
        name: z.string()
    })
    const safeParse = requireBody.safeParse(req.body);

    if (!safeParse.success) {
        res.json({
            message: "Incorrect Format",
            error: safeParse.error
        })
        return // return to stop the function
    }
    const { username, password, name } = req.body;
    await UsersModel.create({
        username: username,
        password: password,
        name: name
    })
    res.json({
        message: "You are signed up as user"
    })

})

UserRouter.post("/signin", async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const user = await UserModel.findOne({
        username: username,
        password: password
    })

    if (user) {
        const token = jwt.sign({
            id: user._id.toString()
        }, JWT_SECRET);
        res.json({
            token: token
        })
    } else {
        res.status(403).send({
            message: "Incorrect credentials"
        })
    }

})

UserRouter.get("/courses", function (req, res) {

})

module.exports = {
    UserRouter: UserRouter
}