import { User } from "../models/user.model.js";
import { OTP } from "../models/otp.model.js";
import { otpExpiryTime } from "../utils/otp.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!email && !phone) {
      return res.status(400).json({ success: false, message: "Email or phone is required" });
    }

    // Check if user already exists
    const existing = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existing) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Create user
    const user = new User({ name, email, phone, isVerified: false });
    await user.save();

    // Hardcoded OTP
    const otp = "123456";

    await OTP.create({
      identifier: email || phone,
      code: otp,
      expiresAt: otpExpiryTime(),
    });

    return res.status(201).json({
      success: true,
      message: "User registered. OTP sent.",
      otp, // send in dev only
    });
  } catch (err) {
    console.error("Registration Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
