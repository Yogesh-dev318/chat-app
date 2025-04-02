import express from "express";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { connectDB } from "./lib/db.js";
import cors from "cors"
import { app ,server} from "./lib/socket.js";

dotenv.config();


app.use(express.json({limit:'50mb'}))
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

const PORT=process.env.PORT;

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);


server.listen(PORT,()=>{
    console.log(`server is running on port: ${PORT}`)
    connectDB()
})
