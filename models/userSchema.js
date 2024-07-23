import mongoose  from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
   firstName :{
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
   nic:{
    type:String,
    required:true,
    minLength:[10,"NIC  Must Contains At least 10 Characters"],
    maxLength:[10,"NIC  Must Contains At most 10 Characters"],
   },
   dob:{
    type:Date,
    required:[true,"DOB is required"],

   },
   gender:{
    type:String,
    required:true,
    enum:["Male","Female"]
    
   },
   password:{
    type:String,
    minLength:[8,"Password Must Contain At Least 8 Characters!"],
    required:true,
    select:false,
   },
   role:{
    type:String,
    required:true,
    enum:["Admin","Patient","Doctor"],
   },
   doctorDepartment:{
    type:String,

   },
   docAvator:{
     public_id:String,
     url:String
   },
  //  generateJsonWebToken(): string;
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
       next();
    }

    this.password = await bcrypt.hash(this.password,10);

})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}


userSchema.methods.generateJsonWebToken = function(){
  return jwt.sign({id: this._id},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRES,})
}
// userSchema.methods.generateJsonWebToken = function (): string {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY as string, {
//     expiresIn: process.env.JWT_EXPIRES,
//   });
// };

export const User = mongoose.model("User",userSchema)
