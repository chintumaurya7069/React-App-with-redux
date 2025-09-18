import express from "express";
import mongoose from "mongoose";
import bodyParser from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./router/user.js";
import authRouter from "./router/auth.js";
import productRouter from "./router/product.js";
import cartRouter from "./router/cart.js";
import addressRouter from "./router/address.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => res.send({ message: "This Is Home Route" }));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected Successfully...!"))
  .catch((err) => console.log(err));

const port = 3000;

app.listen(port, () => console.log(`Server is Running on ${port}`));
