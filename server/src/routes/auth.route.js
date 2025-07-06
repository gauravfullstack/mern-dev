import express from "express";
import { checkUserExists } from "../controllers/auth.controller.js"; // <-- import the controller function
import { registerUser } from "../controllers/register.controller.js";

const router = express.Router();

router.post("/check-user", checkUserExists);
router.post("/register", registerUser);

export default router;
