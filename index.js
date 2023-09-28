const express = require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/userRoutes")
const { blogRouter } = require("./routes/blogRoutes")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())
app.use("/user",userRouter)
app.use("/blog",blogRouter)

app.get("/",(req,res)=>{
    res.send(`testing... testing...`)
})

app.listen(8080,async()=>{
    try {
        await connection
        console.log(`server is running`)
    } catch (error) {
        console.log(error)
    }
})