const express = require("express");
const AdminRouter = express.Router();
const {AdminModel} = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "s3cret";

AdminRouter.post("/signup",async function(req,res){
       const {username, password, name} = req.body;
       await AdminModel.create({
        username: username, 
        password: password,
        name: name
       })
       res.json({
        message: "You are signed up as admin"
       })
})

AdminRouter.post("/signin",async function(req,res){
    const {username, password} = req.body;
       const admin = await AdminModel.findOne({
        username: username, 
        password: password
       })
       if(admin){
        const token = jwt.sign({
            id: admin._id.toString() 
        }, JWT_SECRET);
        res.json({
            message: "You are signed in"
        })
       } else{
        res.status(403).send({
            message: "Incorrect credentials"
        })
       }


})

AdminRouter.post("/course",async function(req,res){

})

AdminRouter.delete("/course",async function(req,res){

})

AdminRouter.put("/course",async function(req,res){
    
})

module.exports = {
    AdminRouter: AdminRouter
}