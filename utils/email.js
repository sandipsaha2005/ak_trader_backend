import { User } from "../models/userSchema.js";
export const checkEmailExists = async (email) => {
    try {
        // Check if a user with the provided email exists
        const user = await User.findOne({ email });
        
        if (user) {
            return true; // Email exists in the collection
        }
        
        return false; // Email is not present in the collection
    } catch (error) {
        console.error('Error checking email existence:', error);
        throw error; // Handle errors appropriately in your application
    }
};