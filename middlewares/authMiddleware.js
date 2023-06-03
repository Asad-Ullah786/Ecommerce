
const jwt = require ('jsonwebtoken')

// const { findById } = require('../models/userModel')
const userModel = require('../models/userModel')

const requireSignIn = async (req,res,next) => {
    try {
        const decode = jwt.verify(
            req.headers?.authorization?.split(' ')[1],
            process.env.JWT_SECRET
        )
        // console.log(decode,"jjjj")

        if(decode){
            // user = decode._id
            // const user_id = await findById(decode._id).select('name email role') 
            // console.log(user_id,"decode")
            // console.log(decode,"token if")
            const user = await userModel.findById(decode._id).select('name email role')
            req.userAuth=user;
            // console.log(user,"shami")
            next()
            
        }
        else{
            res.status(400).json({
                success: false,
                message: "Invalid authorization"
            })
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid authorization"
        })
    }
}
// admin access

const isAdmin = (req,res,next) => {
    try {
        if(req.userAuth.role !== 1){
            return res.status(401).json({
                success:false,
                message:"Unauthorized Access"
            })
        }
        else{
            next()
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Server Error",
            error:error.message
        })
    }
}
module.exports = {requireSignIn,isAdmin};