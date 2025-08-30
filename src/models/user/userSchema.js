import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { decrypt } from "dotenv";
import AutoIncrementFactory from 'mongoose-sequence';


const AutoIncrement = AutoIncrementFactory(mongoose);

const userSchema = new mongoose.Schema({
    username: {
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
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})
// comparing password
userSchema.methods.comparePassword = async function (enteredPassword) {
    // let userPass= await bcrypt.hash(enteredPassword,10)
    try {
        return await bcrypt.compare(enteredPassword, this.password);
    } catch (error) {
        console.log(error);

        throw new Error('Password comparison failed');
    }
}

// generating jwt token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

userSchema.plugin(AutoIncrement, { inc_field: 'usernameSequence', start_seq: 1000 });



export const User = mongoose.model("User", userSchema)