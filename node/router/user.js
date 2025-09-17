import express from "express";
import { addUser, getUsers, removeUser, updateUser } from "../controller/user.js";

const router = express.Router();

//register user
router.post("/addUser", addUser);

//Get All users
router.get("/all", getUsers);

router.put("/:userId", updateUser);

router.delete("/:userId", removeUser);

export default router;
