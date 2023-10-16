const dotenv = require("dotenv")
const mongoose = require('mongoose')

dotenv.config({path:'C:/NOBLEAUSTINE/GitTogether/TureON/Server/source/config.env'})

const DBUrl = process.env.URL
const connectionParams ={
    useNewUrlParser:true,
    useUnifiedTopology:true

}

const connectDB = async () => {
    try{

        await mongoose.connect(DBUrl,connectionParams);
        console.log("successfully connected to the DataBase......");

    }catch(error){
        console.error(error.message)
    }
}

module.exports = connectDB;