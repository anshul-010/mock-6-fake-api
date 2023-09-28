const express = require("express")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require("../model/userModel")

const userRouter = express.Router()

// Registering new user
userRouter.post("/register",async(req,res)=>{
    const {username,avatar,email,password} = req.body
    try {
        const checkuser = await UserModel.findOne({email})
        if(checkuser){
            return res.send({"msg":"You are already register please login"})
        }
        bcrypt.hash(password, 7, async(err,hash)=>{
            if(err){
                res.send({"msg":err})
            }
            else{
                const newUser = new UserModel({username,avatar,email,password:hash})
                await newUser.save()
                res.status(200).send({"msg":"new user is register"})
            }
        })

    } catch (error) {
        res.send({"msg":error})
    }
})


// Login user
userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err,result)=>{
                let token = jwt.sign({},"privateKey")
                res.status(200).send({"msg":"login successfully",token,"name":user.username})
            })
        }
        else{
            res.send({"msg":"wrong credential"})
        }
    } catch (error) {
        
    }
})


module.exports = {userRouter}