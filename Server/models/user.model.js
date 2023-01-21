const mongoose = require('mongoose')




const Schema = mongoose.Schema;

const User= new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    }
    
},{
collection:'users'
}
);

module.exports= mongoose.model('User', User);