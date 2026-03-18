require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, "public")))

/* DATABASE CONNECTION */

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err.message))

/* SCHEMA */

const InquirySchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    message: String,
    date: {
        type: Date,
        default: Date.now
    }
})

const Inquiry = mongoose.model("Inquiry", InquirySchema)

/* API */

app.post("/api/inquiry", async (req,res)=>{

    try{

        const {name,phone,email,message} = req.body

        const newInquiry = new Inquiry({
            name,
            phone,
            email,
            message
        })

        await newInquiry.save()

        res.json({success:true})

    }catch(err){

        res.status(500).json({success:false})

    }

})

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})