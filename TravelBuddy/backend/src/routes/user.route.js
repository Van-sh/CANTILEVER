import { Router } from "express";

import {
   deleteUser,
   getCurrentUser,
   getUserProfile,
   loginUser,
   logoutUser,
   registerUser,
   updateUser,
   updateUserLocation,
} from "../controller/user.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);
router.post("/current-location", authUser, updateUserLocation);
router.get("/me", authUser, getCurrentUser);

router.post("/logout", authUser, logoutUser);

router.get("/profile", authUser, getUserProfile);

router.put("/update", authUser, updateUser);

router.delete("/delete", authUser, deleteUser);

export default router;
