import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    identifier: {
      type: String, // Can be email or phone number
      required: true,
    },
    code: {
      type: String, // The OTP code
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

export const OTP = mongoose.model("OTP", otpSchema);
