const express = require("express");
const AdminRouter = express.Router();
const { AdminModel, CourseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { ADMIN_JWT_SECRET } = require("../config")
const { adminMiddleware } = require("../middlewares/admin")
const bcrypt = require("bcrypt");
const { z } = require("zod");

AdminRouter.use((req, res, next) => {
    console.log('Time: ', new Date().toLocaleString(), ' Method: ', req.method);
    next();
});

AdminRouter.post("/signup", async function (req, res) {
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
    if (!admin) {
        return res.json({
            message: "Incorrect credentials"
        })
    }
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (passwordMatch) {
        const token = jwt.sign({
            id: admin._id.toString()
        }, ADMIN_JWT_SECRET);
        res.json({
            token: token
        })
    } else {
        res.status(403).send({
            message: "Incorrect credentials"
        })
    }
})

AdminRouter.post("/course", adminMiddleware, async function (req, res) {
    const adminId = req.userId;
    const { title, description, price, imageurl } = req.body;
    const course = await CourseModel.create({
        title: title,
        description: description,
        price: price,
        imageurl: imageurl,
        creatorId: adminId
    })
    res.json({
        message: "course created",
        courseId: course._id
    })

})

AdminRouter.delete("/course", adminMiddleware, async function (req, res) {
    const { courseId } = req.body;

    const result = await CourseModel.deleteOne({
        _id: courseId,
        creatorId: req.userId
    })
    res.json({
        message: "Course Deleted",
        courseId
    })

})

AdminRouter.get("/course.bulk", adminMiddleware, async function (req, res) {
    const adminId = req.userId;

    const courses = await CourseModel.find({
        creatorId: adminId
    })
    res.json({
        courses
    })
})

AdminRouter.put("/course", adminMiddleware, async function (req, res) {
    const adminId = req.userId;
    const { title, description, price, imageurl, courseId } = req.body;
    const course = await CourseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    }, {
        title: title,
        description: description,
        price: price,
        imageurl: imageurl
    })
    res.json({
        message: "Course Updated",
        courseId: course._id
    })
})

module.exports = {
    AdminRouter: AdminRouter
}