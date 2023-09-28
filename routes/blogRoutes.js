const express = require("express")
const { BlogModel } = require("../model/blogModel")

const blogRouter = express.Router()

blogRouter.post("/blogs",async(req,res)=>{
    try {
        const blog = new BlogModel(req.body)
        await blog.save()
        res.status(200).send({"msg":"new blog created"})
        // console.log(blog)
    } catch (error) {
        
    }
})

blogRouter.get("/",async(req,res)=>{
    try {
        const blog = await BlogModel.find()
        res.status(200).send({"data":blog})
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})

// update
blogRouter.patch("/blogs/:id",async(req,res)=>{
    const {id} = req.params
    try {
        await BlogModel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).send({"msg":"blog updated"})
    } catch (error) {
        res.status(400).send({"msg":error})
    }

})


delete
blogRouter.delete("/blogs/:id",async(req,res)=>{
    const {id} = req.params
    try {
        await BlogModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":"blog delete"})
    } catch (error) {
        res.status(400).send({"msg":error})
    }

})

module.exports = {blogRouter}


