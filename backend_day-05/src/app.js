const express = require("express")
const app = express() //server created
const notemodel=require("./models/notes.model")
app.use(express.json())
app.post("/notes", async (req, res) => {

const { title, description } = req.body


   const notes=  await  notemodel.create({
         title,description
   })
    
    res.status(201).json({
        message: "note created sucessfully",
        notes
        
    })
})

app.get("/notes", async (req, res) => {
    const notes = await notemodel.find()
    
res.status(200).json({
    message: "notes fetched sycessfully",
    notes
})


})

module.exports=app