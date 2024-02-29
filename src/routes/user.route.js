import express from "express";
import {
  changepassword,
  login,
  register,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.put("/changepassword", changepassword);

export default router;
