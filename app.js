import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";


import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors"

// const express=require("express");
export const app=express();
//USING MIDDLEWARE
config({
   path: "./data/config.env", 
});

app.use(express.json());
app.use(cookieParser());

app.use(cors({
   origin:[process.env.FRONTEND_URL],
   methods:["GET", "POST", "PUT", "DELETE"],
   credentials:true,
}))
//ROUTES
app.use("/api/v1/users",userRouter);
app.use("/api/v1/task", taskRouter);
//CONNECT MONGOOSE TO DATABASE AND MAKE NAME OF DATABASE

app.get("/", (req,res)=>{
   res.send("just be alone"); 
});
//USING ERROR MIDDLEWARE
app.use(errorMiddleware);


