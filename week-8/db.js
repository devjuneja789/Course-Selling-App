const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
    username: {type: String, unique: true},
    password: String,
    name: String
})

const Course = new Schema({
    description: String,
    userId: ObjectId
})

const Admin = new Schema({
    username: {type: String, unique: true},
    password: String,
    name: String
})

const UsersModel = mongoose.model("users",User);
const CourseModel = mongoose.model("course",Course);  
const AdminModel = mongoose.model("admin",Admin);  


module.exports = {
    UsersModel,
    CourseModel,
    AdminModel
}