import mongoose from "mongoose";

export const connectDB=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbname: "backendapi",
    }).then(()=>
        console.log("database Connected"))
      .catch((e)=> console.log(e));
} 