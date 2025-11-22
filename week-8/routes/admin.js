const express = require("express");
const AdminRouter = express.Router();
const { AdminModel } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "s3cret";
const bcrypt = require("bcrypt");
const { z } = require("zod");

AdminRouter.post("/signup", async function (req, res) {
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
    const hashedPassword = await bcrypt.hash(password, 5);
        console.log(hashedPassword);
    await AdminModel.create({
        username: username,
        password: hashedPassword,
        name: name
    })
    res.json({
        message: "You are signed up as admin"
    })
})

AdminRouter.post("/signin", async function (req, res) {
    const { username, password } = req.body;
    const admin = await AdminModel.findOne({
        username: username
    })
    if(!admin){
        res.json({
            message: "Incorrect credentials"
        })
    }
    const passwordMatch = await bcrypt.compare(password, admin.password);
    
    if (passwordMatch) {
        const token = jwt.sign({
            id: admin._id.toString()
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

AdminRouter.post("/course", async function (req, res) {

})

AdminRouter.delete("/course", async function (req, res) {

})

AdminRouter.put("/course", async function (req, res) {

})

module.exports = {
    AdminRouter: AdminRouter
}