const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
     
    // no need of explicit
    //_id: mongoose.Schema.Types.ObjectId,

    username: {
        type:String,
        require: true,
        unique: true
    },

    email: {
        type: String,
        unique: true
        // ,match:

    },

    password: {
        type: String,
        require: true,
        unique: true

    },

    name:{
        type: String
    },

    gitId:{
        type : String
    },

    about:{
        type : String
    },

    image:{
        data: Buffer,
        contentType: String
    }


})


module.exports = mongoose.model('tureONians',userSchema)
