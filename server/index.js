const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose');

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

app.use(cors())
app.use(express.json());

const PORT = process.env.PORT || 3000

//schema
const schemaData = mongoose.Schema({
    "name": String,
    "email": String,
    "mobile": Number,
}, {
    timestamps: true
})

//model
const userModel = mongoose.model("user", schemaData)

// app.get('/', function(req, res) {
//     res.send('Hello World')
// })

//read
app.get('/', async(req, res) => {
    const data = await userModel.find({})
    res.json({ success: true, data: data })
})

//create data / save data in mongodb
app.post('/create', async(req, res) => {
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({ success: true, message: "data saved successfully" })
})

//connecting the db
mongoose.connect('mongodb://localhost:27017/testCRUD')
    .then(() => {
        console.log('Connected to DB')
        app.listen(PORT, () => console.log("Sever is running")) // app.listen(3000)
    })
    .catch((err) => console.log(err)); //if there's any error it will show in the console