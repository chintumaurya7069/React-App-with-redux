import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  country: { type: String, require: true },
  state: { type: String, require: true },
  city: { type: String, require: true },
  address1: { type: String, require: true },
  address2: { type: String},
  plotNumber: { type: String, require: true },
  pinCode: { type: Number },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const Address = mongoose.model("Address", addressSchema);
