const jwt = require('jsonwebtoken');
const tureONian = require('../models/tureONianModel.js');
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async (req,res,next)=>{

    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        try{
            // token from header
            token = req.headers.authorization.split(" ")[1]
            
            // verify token
            const decoded =jwt.verify(token,process.env.KEY)
            
            // get user from token
            req.user = await tureONian.findById(decoded._id).select('-password')

            next()

        }catch(error){

            console.log(error)
            res.status(401).json({
                message: "authentication failed......"
            })
        }
    }
    if(!token){
        res.status(401)
        throw new Error("Not authorized, no token......")
    }




})

module.exports = {protect}

// module.exports = (req, res,next) => {
//     try{
//         const decoded = jwt.verify(req.body.token, process.env.KEY);
//         req.userData = decoded;
//         next();
//     }catch(error){
//         return res.status(401).json({ message:"Sorry wrong token" });

//     }
// };