import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true },
  number: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
