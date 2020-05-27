const mongoose = require('mongoose');
const EmployeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    phone:{
        type:String,
        required: true
    },
    picture:{
        type:String,
        required: true
    },
    salary:{
        type:String,
        required: true
    },
    position:{
        type:String,
        required: true
    }
});

mongoose.model('employee',EmployeeSchema);