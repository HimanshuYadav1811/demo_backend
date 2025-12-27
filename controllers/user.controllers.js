
import { user } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { sendCokie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";




export const userRegister = async (req, res, next) => {
    try {

        const { email, password } = req.body;
        const existingUser = await user.findOne({ email: email });

        if (existingUser) {
            return next(new ErrorHandler("User already exists", 400));
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new user({ ...req.body, password: hashedPassword });
        await newUser.save();
        sendCokie({ user: newUser, res, message: "User registered successfully", statusCode: 201 });
    }
    catch (err) {
        return next(new ErrorHandler(err.message));
    }
}

export const userLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const existingUser = await user.findOne({ email: email });
    if (!existingUser) return next(new ErrorHandler("User does not exist", 400));

    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordMatch) return next(new ErrorHandler("Invalid credentials", 400));
    sendCokie({ user: existingUser, res, message: "User logged in successfully", statusCode: 200 });
}

export const getAllUsers = async (req, res, next) => {
    try {
        const response = await user.find({});
        res.json({ data: response, message: "All users fetched", success: true });
    } catch (err) {
        return next(new ErrorHandler("Failed to fetch users", 500));
    }

}
export const getUserDetails = async (req, res, next) => {
    const { id } = req.params;
    const response = await user.findById(id);
    if (!response) return next(new ErrorHandler("User not found", 404));
    res.json({ data: response, message: "User details fetched", success: true });
}


export const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    const response = await user.findByIdAndDelete(id);
    if (!response) return next(new ErrorHandler("User not found", 404));
    
    res.json({ message: "User deleted successfully", success: true, response });
}





