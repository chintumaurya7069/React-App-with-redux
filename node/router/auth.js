import express from "express";
import { login, register } from "../controller/user.js";

const router = express.Router();

//register user
router.post("/register", register);
router.post("/login", login);

export default router;
