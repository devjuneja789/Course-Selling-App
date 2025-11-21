const express = require("express");
const CourseRouter = express.Router();

CourseRouter.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

CourseRouter.post("/purchase", function(req,res){

})

CourseRouter.get("/", function(req,res){

})

module.exports = {
  CourseRouter: CourseRouter
}