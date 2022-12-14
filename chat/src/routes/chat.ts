import { createRoom, getRoom, getMessages, joinRoom, getConversation, loadMessage } from "../controllers/chat";
import express from "express";
import { isAzureServer } from "../middleware/auth";
export const router = express.Router();

router.post("/createRoom", isAzureServer, createRoom);
router.post("/joinRoom", isAzureServer, joinRoom);
router.get("/rooms", getRoom);
router.get("/messages", getMessages);
router.get("/conversation", getConversation);
router.get("/loadMessages", loadMessage);