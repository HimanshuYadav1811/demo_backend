import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Unauthorized: No token provided",
            success: false
        });
    }
    // Bearer token split
    const token = authHeader.split(" ")[1];

    if (!token) {
        return next(new ErrorHandler("Unauthorized: No token provided", 401));
    }
    try {
        // explain jwt verification
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token  
        req.user = decoded; // { id, role, email ... }  
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized: Invalid token",
            success: false
        });
    }
};


export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403));
        }
        next();
    }
}