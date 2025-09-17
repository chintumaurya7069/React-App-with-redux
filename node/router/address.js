import express from "express";
import { addAddress, getAddressById } from "../controller/address.js";

const router = express.Router();

router.post("/addAddress/:userId", addAddress);
router.get("/:userId", getAddressById);


export default router;
