//creating required objects
const express = require('express')
const bodyParser =require('body-parser')
const connectDB = require('./database.js');

const tureONianRoute = require('./routes/tureONian.js')
const path = require("path")

connectDB()
const app = express()


app.use(bodyParser.json());
app.use((req,res,next) =>{
    console.log(`${new Date().toString()} => ${req.originalUrl} `,req.body)
    next() 
})
app.use(tureONianRoute);
app.use((req,res,next)=>{
    res.status(404).send('you are lost my friend......')
})

// ------------ Deployment ---------------
const __dirname1 = path.resolve();
if(process.env.NODE_ENV === 'production'){

   app.use(express.static(path.join(__dirname1,"/Client/build")));
   app.get('*',(req,res)=>{ res.sendFile(path.resolve(__dirname1,"Client","build","index.html")) })
}else{
    app.get('/',(req,res)=>{ res.send("API is running ") });

}
// ------------ Deployment ---------------

const PORT = process.env.PORT 
app.listen(PORT,()=> console.info(`Server has started on port ${PORT}......`)) 