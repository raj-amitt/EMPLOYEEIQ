import jwt from 'jsonwebtoken'
import User from '../models/User.js'
const verifyUser = async (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1]; //since we are accepting the token in the format Bearer <token> and the token is at index 1
        console.log("Auth Header:", req.headers.authorization);
        console.log("Extracted Token:", token);

        if(!token){
            res.status(404).json({success:false, error:"No token provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY)
        if(!decoded){
            res.status(404).json({success:false, error:"Invalid token"})
        }

        const user = await User.findById({_id: decoded._id}).select('-password')//i have stored the user id in the token while generating it, -password is excluded for security reasons
        if(!user){
            return res.status(404).json({success:false, error:"User not found"})
        }

        req.user = user
        next();
    } catch (error) {
        return res.status(500).json({success:false, error:"Server Error " + error.message})
    }
}

export default verifyUser;