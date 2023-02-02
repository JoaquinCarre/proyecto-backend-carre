import { Router } from "express";
import { auth, verifyAuth } from "../../controllers/authController.js";
import {
  getAuthUser,
  registerUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteOneUser,
} from "../../controllers/usersController.js";

const router = Router();

router.get("/me", auth, verifyAuth, getAuthUser);
router.post("/", registerUser);
router.get("/", getAllUsers);
router.get("/:id", getOneUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteOneUser);

export default router;
