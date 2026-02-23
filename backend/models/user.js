
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter your name"],
        maxLength:[50, "your name cannot exceed 50 chac"]
    },
    email:{
        type:String,
        required:[true, "Please enter your email"],
        unique:true
    },
    password:{
        type:String,
        required:[true, "Please enter your Password"],
    },
    avatar:{
        public_id:String,
        url:String,
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
}, {timestamps:true});

// Encrypting password before saving the user
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});


// Return the Token
userSchema.methods.getJwtToken = function(){

    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRES_TIME
    });

}


// Compare the Token
userSchema.methods.comparePassword =  async function(enteredPassword){

    return await bcrypt.compare(enteredPassword, this.password);

}

export default mongoose.model("User", userSchema);