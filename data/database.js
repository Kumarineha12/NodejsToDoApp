import mongoose from "mongoose";

export const connectDB=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbname: "backendapi",
    }).then((c)=>
        console.log(`database Connected with ${c.connection.host}`))
      .catch((e)=> console.log(e));
} 