const express = require("express");
const UserRouter = express.Router();
const { UsersModel, PurchaseModel } = require("../db");
const jwt = require("jsonwebtoken");
const USER_JWT_SECRET = require("../config");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const { userMiddleware } = require("../middlewares/user");


UserRouter.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

UserRouter.post("/signup", async function (req, res) {
    const requireBody = z.object({   // input validation
        username: z.string().email(),
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
    const hashedPassword = await bcrypt.hash(password, 5);
    console.log(hashedPassword);
    await UsersModel.create({
        username: username,
        password: hashedPassword,
        name: name
    })
    res.json({
        message: "You are signed up as user"
    })

})

UserRouter.post("/signin", async function (req, res) {
    const { username, password } = req.body;

    const user = await UsersModel.findOne({
        username: username
    })
    if (!user) {
        return res.status(403).json({ message: "Incorrect credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);


    if (passwordMatch) {
        const token = jwt.sign({
            id: user._id.toString()
        }, USER_JWT_SECRET);
        res.json({
            token: token
        })
    } else {
        res.status(403).send({
            message: "Incorrect credentials"
        })
    }

})

UserRouter.get("/courses", userMiddleware,async function (req, res) {
    const userId = req.userId;
    const purchases = await PurchaseModel.find({
      userId
    }) 
    res.json({
        purchases
    });
})

module.exports = {
    UserRouter: UserRouter
}