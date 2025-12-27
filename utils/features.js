import jwt from "jsonwebtoken";

export const sendCokie = ({user,res,message,statusCode=200}) => {
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.status(statusCode)
    .cookie("token", token, { httpOnly: true, secure: true, maxAge: 15 * 60 * 1000 })
    .json({ message: message, data: user, token: token, success: true });
}