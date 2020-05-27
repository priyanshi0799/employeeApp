const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./employee');

const app = express();

const mongoURI = 'mongodb+srv://employee:NHuOyzTZnix7n8p3@cluster0-74yeb.mongodb.net/test?retryWrites=true&w=majority';

app.use(bodyParser.json());

const Employee = mongoose.model('employee');
mongoose.connect(mongoURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>{
    console.log('Connected to MongoDB');
})

mongoose.connection.on('error',(err)=>{
    console.log('Error',err);
})

app.get('/',(req,res)=>{
    Employee.find({})
    .then(data=>{
        res.send(data)
    }).catch(err=>console.log(err))
})

app.post('/send-data',(req,res)=>{
    const employee = new Employee({
        name:req.body.name,
        email:req.body.email,
        phone: req.body.phone,
        picture: req.body.picture,
        salary: req.body.salary,
        position: req.body.position
    })
    employee.save()
    .then(data=>{
        console.log(data)
        res.send('Success')
    }).catch(err=>console.log(err))
    
})

app.post('/delete',(req,res)=>{
    Employee.findByIdAndRemove(req.body._id)
    .then(data=>{
        console.log(data)
        res.send('deleted')
    }).catch(err=>console.log(err))
})

app.post('/update',(req,res)=>{
    Employee.findByIdAndUpdate(req.body._id,{
        name:req.body.name,
        email:req.body.email,
        phone: req.body.phone,
        picture: req.body.picture,
        salary: req.body.salary,
        position: req.body.position
    }).then(data=>{
        console.log(data)
        res.send('Updated')
    }).catch(err=>console.log(err))
})
app.listen(3000,()=>{
    console.log('Server is running')
})

