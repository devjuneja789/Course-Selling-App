const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
    username: {type: String, unique: true},
    password: String,
    name: String
})

const Course = new Schema({
    title: String,
    description: String,
    price: Number,
    imageurl: String,
    creatorId: ObjectId
})

const Admin = new Schema({
    username: {type: String, unique: true},
    password: String,
    name: String
})

const Purchase = new Schema({
      userId: ObjectId,
      courseId: ObjectId    
})

const UsersModel = mongoose.model("users",User);
const CourseModel = mongoose.model("course",Course);  
const AdminModel = mongoose.model("admin",Admin);  
const PurchaseModel = mongoose.model("purchase", Purchase)

module.exports = {
    UsersModel,
    CourseModel,
    AdminModel,
    PurchaseModel
}