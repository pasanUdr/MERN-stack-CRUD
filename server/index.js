const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose');

app.use(cors())

const PORT = process.env.PORT || 3000



// app.get('/', function(req, res) {
//     res.send('Hello World')
// })

app.get('/', (req, res) => {
    res.json({ message: "Sever is running CRUD" })
})

// app.listen(3000)
app.listen(PORT, () => console.log("Sever is running"))