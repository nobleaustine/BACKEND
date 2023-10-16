//creating required objects
const express = require('express')
const bodyParser =require('body-parser')
const connectDB = require('./database.js');

const tureONianRoute = require('./routes/tureONian.js')

connectDB()
const app = express()

app.use(bodyParser.json());
app.use((req,res,next) =>{
    console.log(`${new Date().toString()} => ${req.originalUrl} `,req.body)
    next() 
});
app.use(tureONianRoute);
app.use((req,res,next)=>{
    res.status(404).send('you are lost my friend......')
});

const PORT = process.env.PORT 
app.listen(PORT,()=> console.info(`Server has started on port ${PORT}......`)) 