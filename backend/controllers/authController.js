
import asyncHandler from "../middleware/asyncHandler.js";
import sendEmail from "../utils/sendEmail.js";
import User from "../models/user.js";
import { getResetPasswordTemplate } from "../utils/emailTemplate.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";
import crypto from "crypto";



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

// Forgot Password

export const forgotPassword = asyncHandler(async(req, res, next) => {


    // Find the user 
    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found", 404))
    }

    // Get the reset password token
    const resetToken = user.getResetPasswordToken();

    console.log(resetToken);

    await user.save();

    // Create a reset password url
    const resetUrl = `${process.env.FRONTEND_URL}/api/v1/password/reset/${resetToken}`;

    const message = getResetPasswordTemplate(user?.name, resetUrl);

    try{

        await sendEmail({
            email:user.email,
            subject:"Ecom password recovery",
            message
        })

        res.status(200).json({
            message:`Email sent to ${user?.email}`
        })


    }catch(error){

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        return next(new ErrorHandler(error?.message, 500));

    }



})


// Reset Password
export const resetPassword = asyncHandler(async(req, res, next) => {


 // Hash the url token
 const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire:{$gt:Date.now()}
  });      


  if(!user){
    return next(new ErrorHandler("User not found", 404))
  }

  if(req.body.password !== req.body.confirmPasssword){
    return next(new ErrorHandler("Password does not match", 400))
  }

    //   Set the new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);

})