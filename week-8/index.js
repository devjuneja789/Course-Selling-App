const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {UserModel , CourseModel, AdminModel} = require("./db");
const{JWT_SECRET, auth} = require("./auth");
const {UserRouter} = require("./routes/user");
const {CourseRouter} = require("./routes/course");
mongoose.connect("mongodb+srv://devjuneja789_db_user:BASRzOWyy8SrEriX@cluster0.aunngqs.mongodb.net/course-selling-app");

const app = express();

app.use("/user", UserRouter);
app.use("/course", CourseRouter);

app.listen(3000);