const express = require("express");
const CourseRouter = express.Router();
const {CourseModel, PurchaseModel} = require("../db");
const { userMiddleware } = require("../middlewares/user");


CourseRouter.use((req, res, next) => {
    console.log('Time: ', new Date().toLocaleString(), ' Method: ', req.method);
    next();
});

CourseRouter.post("/purchase", userMiddleware ,async function(req,res){
     const userId = req.userId;
     const courseId = req.body.courseId;
     
     await PurchaseModel.create({
      userId,
      courseId
     })

     res.json({
      message: "You have successfully bought the course"
     })
})

CourseRouter.get("/",async function(req,res){
  const courses = await CourseModel.find({})

  res.json({
    courses
  })
})

module.exports = {
  CourseRouter: CourseRouter
}