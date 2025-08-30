// import { catchAsyncError } from '../../../middlewares/catchAsyncError.js'
import Joi from 'joi'
import { Admin } from '../../../models/admin/adminSchema.js'
import jwt from 'jsonwebtoken'
// ----------------------------------------------------------------------

export const login = async (req, res, next) => {
    try {
        const { value, error } = Joi.object({
            email: Joi.string().email().required().error(new Error("Email is required and must be a valid email address")),
            password: Joi.string().required().error(new Error("Password is required"))

        }).validate(req.body);

        if (error) return res.status(400).json({ message: error.message });
        const { email, password } = value;
        const AdminUser = await Admin.findOne({ email }).select("+password");

        if (!AdminUser) {
            return res.status(400).json({
                success: false,
                message: "User Not Found",
            });
        }

        const isPasswordMatched = await AdminUser.comparePassword(password);

        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Wrong Password",
            });
        }
        const options = {
            expiresIn: process.env.TOKEN_EXPIRE // Token will expire in 1 hour
        };
        const token = jwt.sign({ email }, process.env.JWT_ADMIN_SECRET_KEY, options);
        return res.status(200).json({
            success: true,
            message: "You have Successfully Logged In",
            accessToken: token,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Some error occurred while logging in',
        })
    }
}


export const me = async (req, res, next) => {
    try {
        const obj = req.user
        console.log("hi");

        const user = await Admin.findOne({ email: obj.email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found',
            });
        }

        return res.status(200).json({
            user: {
                id: user?._id,
                username: user?.adminName,
                email: user?.email,
                phone: user?.phone
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Some error occurred while fetching admin details',
        })
    }
}

export const register = async (req, res, next) => {

    try {
        const { value, error } = Joi.object({

            adminName: Joi.string().required().min(3).max(20).error(new Error("Admin Name must be between 3 to 20 characters")),
            password: Joi.string().required().error(new Error("Password is required")),
            email: Joi.string().email().required().error(new Error("Email is required and must be a valid email address")),
            phone: Joi.string().required().min(10).max(10).error(new Error("Phone number must be 10 digits"))

        }).validate(req.body);

        if (error) return res.status(400).json({ message: error.message });

        const { email, adminName, password, phone } = value;
        const alreadyPresentAdmin = await Admin.findOne({ email: email });

        if (alreadyPresentAdmin) {
            return res.status(400).json({
                success: false,
                message: 'Admin already exists with this email',
            });
        }

        const AdminDetails = await Admin.create({
            adminName,
            password,
            email,
            phone
        });

        await AdminDetails.save();

        return res.status(200).json({
            success: true,
            message: 'Admin Created Successfully.',
            AdminDetails
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Some error occured while creating admin',

        })
    }
}