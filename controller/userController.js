import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";

export const patientRegister = catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,phone,nic,dob,gender,password,role} = req.body;
    if(!firstName || !lastName ||!email || !phone || !nic || !dob || !gender || !password || !role){

        // return next(new ErrorHandler("Please Fill Full Form!",400));
        return next(new ErrorHandler("please fill full form!",400));

    }

    let user = await User.findOne({email});
    if(user){
        return next(new ErrorHandler("User Already Exists!",400));

    }

    user = await User.create({firstName,lastName,email,phone,nic,dob,gender,password,role});
    res.status(200).json({
        success:true,
        message:"user Registered!",
    })

})
