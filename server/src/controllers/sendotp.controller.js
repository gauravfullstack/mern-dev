import { OTP } from "../models/otp.model.js";
import { User } from "../models/user.model.js";
import { otpExpiryTime } from "../utils/otp.js";


export const sendLoginOtp = async (req, res) => {
  try {
    const { identifier } = req.body;

    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const otp = "123456";

    await OTP.create({
      identifier,
      code: otp,
      expiresAt: otpExpiryTime(),
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent to user",
      otp, // only for dev
    });
  } catch (err) {
    console.error("Login OTP Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
