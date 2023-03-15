const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        require : true
    },
    fullName : {
        type : String,
        require : true,
        trim : true
    },
    email:{
        type : String,
        require : true,
        unique : true
    },
    mobileNumber : {
        type : String,
        require : true
    },
    password : {
        type : String,
        required : true,
        minLength : [6, "Password is too short"]
    }
})

module.exports = mongoose.model("User", userSchema)