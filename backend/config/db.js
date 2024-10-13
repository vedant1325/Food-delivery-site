import mongoose from "mongoose";

 export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://dangevedant:vedantmdange@cluster0.fxdecht.mongodb.net/food-del').then(()=>{console.log("Database connected")})
}