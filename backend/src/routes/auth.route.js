import express from "express";
import  { CheckAuth, Login, Logout, signup, updateprofile } from "../controllers/auth.controller.js";
import { protectroute } from "../middleware/auth.js";
const router=express.Router();

router.post("/signup",signup)
router.post("/login",Login)
router.post("/logout",Logout)

router.put("/update-profile",protectroute,updateprofile)
router.get("/check",protectroute,CheckAuth)


export default router;