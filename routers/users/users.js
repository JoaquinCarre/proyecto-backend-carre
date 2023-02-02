import { Router } from "express";
import { auth, verifyAuth } from "../../controllers/authController.js";
import {
  getAuthUser,
  registerUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../../controllers/usersController.js";

const router = Router();

router.get("/me", auth, verifyAuth, getAuthUser);
router.post("/", registerUser);
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
