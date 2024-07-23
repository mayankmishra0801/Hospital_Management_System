import mongoose from "mongoose";
import validator from "validator";


const appointmentSchema = new mongoose.Schema({
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
    // password:{
    //  type:String,
    //  minLength:[8,"Password Must Contain At Least 8 Characters!"],
    //  required:true,
    //  select:false,
    // },
    // role:{
    //  type:String,
    //  required:true,
    //  enum:["Admin","Patient","Doctor"],
    // },
    // doctorDepartment:{
    //  type:String,
 
    // },
    // docAvator:{
    //   public_id:String,
    //   url:String
    // },

    appointement_date:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
    
    doctor:{
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
            required:true,
        },
        
    },

    hasVisited:{
        type:Boolean,
        default:false
    },
    doctorId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    patiendId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    address:{
        type:String, 
        required:true   
    },

    status:{
        type:String,
        enum:["Pending","Approved","Rejected"],
        default:"Pending"
    }

 })

 export const Appointment  = mongoose.model("Appointemnt",appointmentSchema);

