const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {UserModel , CourseModel, AdminModel} = require("./db");
const{JWT_SECRET} = require("./auth");

mongoose.connect("mongodb+srv://devjuneja789_db_user:BASRzOWyy8SrEriX@cluster0.aunngqs.mongodb.net/course-selling-app");


const app = express();
app.use(express.json());

app.post("/signup", async function(req,res){
    const username =  req.body.username;
    const password =  req.body.password;
    const name = req.body.name;

    await UserModel.create({
        username: username,
        password: password,
        name: name 
    })
    res.json({
        message: "You are signed up"
    })
    
})

app.post("/signin", async function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    
    const user  = await UserModel.findOne({
        email:email
    })

})

app.post("/purchase", function(req,res){

})

app.get("/mycourse", function(req,res){

})

app.listen(3000);