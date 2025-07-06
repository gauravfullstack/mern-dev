import { User } from "../models/user.model.js";
import { OTP } from "../models/otp.model.js";
import { generateToken } from "../utils/jwt.js";

export const verifyOtp = async (req, res) => {
  try {
    const { identifier, otp } = req.body;

    if (!identifier || !otp) {
      return res.status(400).json({ success: false, message: "Identifier and OTP required" });
    }

    // Find OTP in DB
    const otpRecord = await OTP.findOne({ identifier, code: otp });

    if (!otpRecord) {
      return res.status(401).json({ success: false, message: "Invalid OTP" });
    }

    if (otpRecord.expiresAt < new Date()) {
      return res.status(401).json({ success: false, message: "OTP expired" });
    }

    // Mark user as verified
    const user = await User.findOneAndUpdate(
      { $or: [{ email: identifier }, { phone: identifier }] },
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Delete OTP from DB
    await OTP.deleteMany({ identifier });

    // Generate JWT Token
    const token = generateToken(user._id.toString());

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error("OTP Verification Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
