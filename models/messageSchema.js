import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First Name Must Contains At least 3 Characters"],
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"Last Name Must Contains At least 3 Characters"],
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Please Provide a valid Email!"]
    },
    phone:{
        type:String,
        required:true,
        minLength:[11,"Phone Number Must Contains At least 11 Characters"],
        maxLength:[11,"Phone Number Must Contains At most 11 Characters"],
    },
    message:{
        type:String,
        required:true,
        minLength:[10,"Message Must Contains At least 10 Characters!"],
    }
});

export const Message = mongoose.model("Message",messageSchema);


