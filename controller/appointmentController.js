import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appointementSchema.js";
// import { Appointment } from "../models/appointmentSchema.js";

import { User } from "../models/userSchema.js";


export const postAppointment = catchAsyncErrors(async(req,res,next)=>{
    
    const {
           firstName,
           lastName,  
           email,
           phone,
           nic,
           dob,
           gender,
           appointement_date,
           department,
           doctor_firstName,
           doctor_lastName,
           hasVisited,
           address,
           role
        

    } = req.body;

    if(!firstName || !lastName ||!email || !phone || !nic || !dob || !gender || !appointement_date || !department || !doctor_firstName || !doctor_lastName ||  !address || !role){
        return next(new ErrorHandler("Please Fill Full Form!",400));
    }

    const isConflict = await User.find({firstName:doctor_firstName,lastName:doctor_lastName,role:"Doctor",doctorDepartment:department});

    if(isConflict.length === 0){
        return next(new ErrorHandler("Doctor Not Found",404));
    }
    if(isConflict.length > 1){
        return next(new ErrorHandler("Doctors Conflict! Please Contact Through Email or Phone",400));
    }

    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;


    const appointment = await Appointment.create({firstName,lastName,email,phone,nic,dob,gender,appointement_date,department,doctorId, doctor:{firstName:doctor_firstName,lastName:doctor_lastName},hasVisited,address,patientId})
    

    res.status(200).json({
        success:true,
        message:"Appointment send successfully!",
        appointment
    })
    


});

export const getAllAppointments = catchAsyncErrors(async(req,res,next)=>{

   
    const appointments = await Appointment.find();
    res.status(200).json({
        success:true,
        appointments
    })

})

export const updateAppointmentStatus = catchAsyncErrors(async(req,res,next)=>{  
      
    const {id} = req.params;
    let appointement = await Appointment.findById(id);

    if(!appointement){     
        return next(new ErrorHandler("Appointment Not Found!",404));
    }

    appointement = await Appointment.findByIdAndUpdate(id,req.body,{new:true,runValidators:true,useFindAndModify:false});
    res.status(200).json({
        
        success:true,
        message:"Appointment Status Updated!",
        appointement

    })


})

export const deleteAppointment = catchAsyncErrors(async(req,res,next)=>{

    const {id} = req.params;
    let appointement = await Appointment.findById(id);
    if(!appointement){
        return next(new ErrorHandler("Appointment Not Found!",404));
    }
    await Appointment.deleteOne();
    res.status(200).json({
        success:true,
        message:"Appointment Deleted Successfully!"
        

    })

})



