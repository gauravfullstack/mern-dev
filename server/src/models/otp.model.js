import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    identifier: String, // email or phone
    code: String,
    expiresAt: Date,
  },
  { timestamps: true }
);

export const OTP = mongoose.model("OTP", otpSchema);
