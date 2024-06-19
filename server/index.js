const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose');

app.use(cors())
app.use(express.json());

const PORT = process.env.PORT || 4000

//schema
const schemaData = mongoose.Schema({
    "name": String,
    "email": String,
    "mobile": Number
}, {
    timestamps: true
})

//model
const userModel = mongoose.model("user", schemaData)

// app.get('/', function(req, res) {
//     res.send('Hello World')
// })

//read api
//http://localhost:4000/
app.get('/', async(req, res) => {
    const data = await userModel.find({})
    res.json({ success: true, data: data })
})

//create api / save data in mongodb
//http://localhost:4000/create
/*
{
   "name": "xxxx",
    "email": "xxxx",
    "mobile": "xxxx"
}
 */
app.post('/create', async(req, res) => {
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({ success: true, message: "data saved successfully", data: data })
})

//update data api
//http://localhost:4000/update
/*
{
   "id": "xxxx",
   "name": "xxxx",
    "email": "xxxx",
    "mobile": xxxxx
}
*/
app.put('/update', async(req, res) => {
    console.log(req.body)
    const { _id, ...rest } = req.body
    console.log(rest)
    const data = await userModel.updateOne({ _id: _id }, rest)
    res.send({ success: true, message: "data updated successfully", data: data })
})

//delete data api
//http://localhost:4000/delete/id(xxxxxxx)
app.delete('/delete/:id', async(req, res) => {
    const id = req.params.id
    console.log(id)
    const data = await userModel.deleteOne({ _id: id })
    res.send({ success: true, message: "data deleted successfully", data: data })
})

//connecting the db
mongoose.connect('mongodb://localhost:27017/testCRUD')
    .then(() => {
        console.log('Connected to DB')
        app.listen(PORT, () => console.log(`Sever is running on port ${PORT}`)) // app.listen(3000)
    })
    .catch((err) => console.log(err)); //if there's any error it will show in the console