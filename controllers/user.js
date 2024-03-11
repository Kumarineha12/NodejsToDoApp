import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";
export const getAllUsers=async (req,res)=>{
      
    // const users=await User.find({})
    // res.json({
    //     success: true,
    //     users,

    // });
};

export const login=async(req,res,next)=>{
  try {
    const {email, password}=req.body;

    const user=await User.findOne({email}).select("+password");
    
    if(!user) return next(new ErrorHandler("Invalid email or password",400));
 //    if(!user)
 //     return res.status(404).json({
 //     success: false,
 //     message: "Invalid email or password",
 // });
  
  const isMatch=await bcrypt.compare(password, user.password);
 //  if(!isMatch) 
 //   return res.status(404).json({
 //     success: false,
 //     message: "Invalid email or password",
 // });
 
 if(!isMatch) return next(new ErrorHandler("Invalid email or password",400));
 
   sendCookie(user, res, `Welcome back, ${user.name}`,200);
  } catch (error) {
    next(error);
  }
};


export const register=async (req,res)=>{
    try {
        const {name,email,password}=req.body;
        let user=await User.findOne({email});
        // if(user) return res.status(404).json({
        //     success: false,
        //     message: "User Already Exist",
        // });
       
    
        if(user) return next(new ErrorHandler("User already exist",400));
      //IF USER NOT EXITS CREATE
        const hashedPassword=await bcrypt.hash(password, 10)
       user=await User.create({
            name,
            email,
            password:hashedPassword
        });
    
        sendCookie(user, res, "registerd successfully", 201);
    } catch (error) {
        next(error);
    }
   
};
export const getMyProfile=async (req,res)=>{
    res.status(200).json({
        success: true,
        user: req.user,
    });
 };
export const logout=async (req,res)=>{
    res.status(200)
    .cookie("token", "", {expires: new Date(Date.now()),
      sameSite:process.env.NODE_ENV==="Development"?lax:"none",
      secure:process.env.NODE_ENV==="Development"?false:true,
    })
    .json({
        success: true,
        user: req.user,
    });
 };

 