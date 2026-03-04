const express = require('express')
const app = express() //server created

app.use(express.json())
const notes=[]

app.post('/notes', (req, res) => {
    
    notes.push(req.body)
    console.log(notes)
    res.send('notes created')
})


app.get('/notes', (req,res) => {
    res.send(notes) 
})



app.listen(3000,()=>{console.log('server satrted at port 3000')})  //server  started