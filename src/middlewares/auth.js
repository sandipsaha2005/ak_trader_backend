import ErrorHandler from './error.js'
import jwt, { decode } from 'jsonwebtoken'
import { User } from "../models/user/userSchema.js"
import { Admin } from "../models/admin/adminSchema.js"

export const isAuthorized = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.sendStatus(401); 

        const token = authHeader.split(' ')[1]; 
        if (!token) return res.sendStatus(401);

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findOne({ email: decoded.email }); 
        // console.log(user);
        
        if (!user) return res.sendStatus(404); 

        req.user = user;
        next(); 
    } catch (error) {
        console.error('Authorization error:', error);
        res.sendStatus(401); // Invalid token or other error
    }
}
export const isAdmin = async (req, res, next) => {
    try {        
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.sendStatus(401); 

        const token = authHeader.split(' ')[1]; 
        if (!token) return res.sendStatus(401);

        const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET_KEY);
        const user = await Admin.findOne({ email: decoded.email }); 
        // console.log(user);
        
        if (!user) return res.sendStatus(404); 

        req.user = user;
        next(); 
    } catch (error) {
        console.error('Authorization error:', error);
        res.sendStatus(401); // Invalid token or other error
    }
}