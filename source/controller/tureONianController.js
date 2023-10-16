const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tureONian = require('../models/tureONianModel.js');
const asyncHandler = require('express-async-handler')


const register = asyncHandler(async (req,res) => {
    try{
        const {username,email,password} = req.body
        
        if(!username || !email || !password){
            res.status(400).json({ message: "please do fill all  the fields......" });
        }
        else{
            const usernameExsist = await tureONian.findOne({username});
            const emailidExsist = await tureONian.findOne({email});

            if(usernameExsist || emailidExsist){
                res.status(400).json({ message: "another account exsist with the following details......"})
            }
            else{
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password,salt)
                
                const user = await tureONian.create({
                    username,
                    email,
                    password: hashedPassword,
                    name:     " ",
                    gitId:    " ",
                    about:    " ",
                    image:    " "
                });
                
                if(user){
                    res.status(201).json({
                        _id:      user._id,
                        username:  user.username,
                        email:     user.email,
                        password:  user.password,
                        message: "new account created successfully......"
                    })
                }
                else{
                    res.status(400).json({ message:"failed to create new account......" })
                }
            }
        }
}catch(error){
    console.log(error)
    res.status(400).json({ message: "an error occured......"})
}

});

const login = asyncHandler(async (req,res) =>{
    try{
        const {username,password}=req.body
        const userExsist = await tureONian.findOne({username})
        
        if(userExsist && (await bcrypt.compare(password,userExsist.password))){
            
            const token = jwt.sign(
                {
                    username:userExsist.username,
                    _id:userExsist._id
                },
                process.env.KEY,
                {
                    expiresIn:".5h"
                });
                
                return res.status(200).json({
                message:"Authentication successful you are logged in......",
                token:token
                });
            }else{
                res.status(400).json({ message:"Authentication failed......"});
            }
        }catch(error){
            console.log(error)
            res.status(400).json({ message: "Authentication failed......"})
            
        }
})

const getMe = asyncHandler(async (req,res) =>{

    const {_id,username,email,name,gitId,about,image} = await tureONian.findById(req.user._id)
    res.status(201).json({
        _id,
        username,
        email,
        name,
        gitId,
        about,
        image


    })
})

module.exports = {register,login,getMe}


