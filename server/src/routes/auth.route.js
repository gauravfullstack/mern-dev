import express from "express";
import { checkUserExists } from "../controllers/auth.controller.js"; // <-- import the controller function
import { registerUser } from "../controllers/register.controller.js";
import { sendLoginOtp } from "../controllers/sendotp.controller.js";
import { verifyOtp } from "../controllers/verifyotp.controller.js";

const router = express.Router();

router.post("/check-user", checkUserExists);
router.post("/register", registerUser);
router.post("/send-login-otp", sendLoginOtp);
router.post("/verify-otp", verifyOtp);


export default router;
