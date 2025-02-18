import express from "express";
import {config}  from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbCoonection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js"
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./router/userRouter.js";
import appointementRouter from "./router/appointementRouter.js";
const app = express();
dbCoonection();
 
config({path:"./config/config.env"})

app.use(cors());
app.use(cors({
    origin:[process.env.FRONTEND_URL,process.env.DASHBOARD_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}))

app.use(cookieParser());
//we will get cookie

app.use(express.json());
//To pass json data as a string

app.use(express.urlencoded({extended:false}));
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/temp/",

}));

app.use("/api/v1/message",messageRouter);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/appointement",appointementRouter);
app.use(errorMiddleware);
export default app;

