import ErrorHandler from '../../../middlewares/error.js'
import jwt from 'jsonwebtoken'
import { User } from '../../../models/user/userSchema.js'
import Joi from 'joi'
// ----------------------------------------------------------------------


export const login = async (req, res, next) => {
    try {
        const { value, error } = Joi.object({
            email: Joi.string().email().required().error(new Error("Email is required and must be a valid email address")),
            password: Joi.string().required().error(new Error("Password is required"))
        }).validate(req.body);

        if (error) return res.status(400).json({ message: error.message });
        const { email, password } = value;
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Not Found",
            });
        }

        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Wrong Password",
            });
        }
        const options = {
            expiresIn: process.env.TOKEN_EXPIRE // Token will expire in 1 hour
        };

        const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, options);

        return res.status(200).json({
            success: true,
            message: "You have Successfully Logged In",
            accessToken: token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Some error occurred while logging in',
        });
    }
}

export const me = async (req, res, next) => {
    try {
        const obj = req.user
        const user = await User.findOne({ email: obj.email });
        return res.status(200).json({
            user: {
                id: user?._id,
                username: user?.username,
                email: user?.email,
                phone: user?.phone
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Some error occurred while fetching user details',
        });

    }
}

export const register = async (req, res, next) => {
    try {
        const { value, error } = Joi.object({
            username: Joi.string().required().error(new Error("Username is required")),
            phone: Joi.string().required().min(10).max(10).error(new Error("Phone number must be 10 digits")),
            email: Joi.string().email().required().error(new Error("Email is required and must be a valid email address")),
            password: Joi.string().required().error(new Error("Password is required"))
        }).validate(req.body);
        console.log(error);
        const { username, phone, email, password } = value;
        if (error) return res.status(400).json({ message: error.message });

        const alreadyPresentUser = await User.findOne({ email: email });


        if (alreadyPresentUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists',
            });
        }

        const userDetails = await User.create({
            username,
            password,
            email,
            phone : Number(phone)
        });
        const options = {
            expiresIn: process.env.TOKEN_EXPIRE // Token will expire in 1 hour
        };

        const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, options);

        await userDetails.save();
        return res.status(200).json({
            success: true,
            message: 'User Created Successfully.',
            // accessToken: token,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Some error occurred while registering user',
        });
    }
}










