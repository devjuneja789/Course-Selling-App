const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const{JWT_SECRET, auth} = require("./auth");
const {UserRouter} = require("./routes/user");
const {CourseRouter} = require("./routes/course");
const {AdminRouter} = require("./routes/admin")

const app = express();

app.use("/api/v1/user", UserRouter);
app.use("/api.v1/course", CourseRouter);
app.use("/api.v1/admin", AdminRouter);

async function main() {
    await mongoose.connect("mongodb+srv://devjuneja789_db_user:BASRzOWyy8SrEriX@cluster0.aunngqs.mongodb.net/course-selling-app");
    console.log("Connecting to DB");
}
main()

app.listen(3000);