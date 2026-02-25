import ErrorHandler from "../utils/errorHandler.js";
import asyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";


// Check if user is auth or not
export const isAuthenticatedUser = asyncHandler(async(req, res, next) => {
    
    const { token } = req.cookies;

    if(!token){
        return next(new ErrorHandler("Login first to assec this resourse", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();

});


// authorize user role

export const authorizeRoles = (...roles) => {

    console.log("admin", roles);

    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler("Roles not access to this resource", 403));
        }

        next();
    }

}