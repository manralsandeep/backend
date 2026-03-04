

const express = require('express')

const app = require('./src/app')

app.use(express.json())

const notes = []

app.get('/notes', (req, res) => {
   res.send(notes)
})

app.post('/notes', (req, res) => {
    notes.push(req.body)
    res.send('note created')
})

app.delete('/notes/:index', (req, res) => {
   
    delete notes[req.params.index]
    res.send('note deleted sucesfully')
})

app.patch('/notes/:index', (req, res) => {
    notes[req.params.index].description=req.body.description
    res.send('note modified sucesfully')
})

app.put('/notes/:index', (req, res) => {
    notes[req.params.index].tittle= req.body.tittle
    notes[req.params.index].description = req.body.description
    res.send('note modified sucesfully')
    
})
app.listen(3000, () => { console.log('server running at port 3000') })  //server started
