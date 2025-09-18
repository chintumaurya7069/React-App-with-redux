import express from "express";
import {  addUser, getUsers, getUsersBYId, removeUser, updateUser } from "../controller/user.js";

const router = express.Router();

router.post("/addUser", addUser);

router.get("/all", getUsers);

router.get("/:userId", getUsersBYId);

router.put("/:userId", updateUser);

router.delete("/:userId", removeUser);

export default router;
