import mongoose from "mongoose";

export const dbCoonection = () =>{
    mongoose.connect(process.env.MONGO_URI,{
       dbName:"HMS_MERN" 
    }).then(()=>{
        console.log("Connected to databse!")
    }).catch(err=>{
        console.log(`Some error occured while connedcting to database:${err}`);
    })
}