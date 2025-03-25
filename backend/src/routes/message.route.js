import express from "express";
import { protectroute } from "../middleware/auth.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

const router=express.Router();

router.get("/users",protectroute,getUsersForSidebar)
router.get("/:id",protectroute,getMessages)
router.post("/send/:id",protectroute,sendMessage)


export default router;