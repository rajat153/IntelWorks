const mongoose = require('mongoose')
const {Schema} = mongoose


const userSchema = Schema({
    firstName:{
        type:String,
        required:[true,"firstName must have a value"],
        minLength:[5,"firstname is too short"]
    },
    lastName:{
        type:String,
         required:[true,"lastName cannot be empty"]
    },
    emailId:{
        type:String,
        required:[true,"emailId cannot be empty"]
    },
    mobile:{
        type:Number,
        required:[true,"mobile cannot be empty"]
    },
    address1:{
        type:String,
        required:[true,"address1 cannot be empty"]
    },
    address2:{
        type:String,
        required:[true,"address2 cannot be empty"]
    },
    state:{
        type:String,
        required:[true,"state cannot be empty"]
    },
    city:{
        type:String
    },
    country:{
        type:String,
        required:[true,"country cannot be empty"]
    },
    zipCode:{
        type:Number,
         required:[true,"zipcode cannot be empty"]
    },
    
})


const User = mongoose.model('User', userSchema);

module.exports = User;