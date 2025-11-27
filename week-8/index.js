const express = require("express");
require('dotenv').config();
console.log(process.env.MONGO_URL);
const mongoose = require("mongoose");
const {UserRouter} = require("./routes/user");
const {CourseRouter} = require("./routes/course");
const {AdminRouter} = require("./routes/admin");

const app = express();
app.use(express.json());


app.use("/api/v1/user", UserRouter);
app.use("/api/v1/course", CourseRouter);
app.use("/api/v1/admin", AdminRouter);

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connecting to DB");
}
main()

app.listen(3000);