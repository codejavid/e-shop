
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";


export const registerUser = asyncHandler(async(req, res, next) => {

    const { name, email, password } = req.body;

    const user = await User.create({
        name, 
        email, 
        password
    });

    // const token = user.getJwtToken();

    // res.status(201).json({
    //     token
    // });

    sendToken(user, 201, res)


})

// Login user

export const loginUser = asyncHandler(async(req, res, next) => {

    const { email, password } = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password", 400))
    }


    // Find user in the db
    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

     // Check if password is correct
     const isPasswordMatched = await user.comparePassword(password);

     if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    // const token = user.getJwtToken();

    // res.status(201).json({
    //     token
    // });

    sendToken(user, 200, res)




})


// Logout user => api/v1/logout

export const logout = asyncHandler(async(req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly:true
    })
    
    res.status(200).json({
        message:"Logged Out"
    });




})