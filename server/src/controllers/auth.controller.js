import { User } from "../models/user.model.js";

export const checkUserExists = async (req, res) => {
  try {
    const { identifier } = req.body;

    if (!identifier) {
      return res.status(400).json({ result: 0, message: "Identifier is required" });
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (user) {
      return res.status(200).json({
        result: 1,
        message: "User already exists. Please login.",
      });
    } else {
      return res.status(200).json({
        result: 0,
        message: "User not found. Proceed to registration.",
      });
    }
  } catch (err) {
    console.error("Error checking user:", err);
    return res.status(500).json({ result: 0, message: "Server error" });
  }
};
