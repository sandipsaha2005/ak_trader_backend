import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { decrypt } from "dotenv";



const adminSchema = new mongoose.Schema({
    adminName: {
        type: String,
        required: [true, 'Please provide your name'],
    },
    email: {
        type: String,
        required: [true, "please provide your email"],
    },
    phone: {
        type: String,
        required: [true, 'Please provide you phone'],
    },
    password :{
        type:String,
        required:true
    }

})

// hashing the pass
adminSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})
// comparing password
adminSchema.methods.comparePassword = async function (enteredPassword) {
    // let userPass= await bcrypt.hash(enteredPassword,10)
    try {
        return await bcrypt.compare(enteredPassword, this.password);
    } catch (error) {
        console.log(error);

        throw new Error('Password comparison failed');
    }
}

// generating jwt token
adminSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_ADMIN_SECRET_KEY, {
        expiresIn: process.env.TOKEN_EXPIRE_ADMIN,
    })
}




export const Admin = mongoose.model("Admin", adminSchema)