import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, unique: true, sparse: true },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
