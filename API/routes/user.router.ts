import express from "express";
import { register, login, getUser, getAllUser, deleteUser, updateProfile } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

// Felhasználó

// Regisztráció
router.post("/register", register);

// Belépés
router.post("/login", login);

// Saját profil lekérése (csak bejelentkezett felhasználónak)
router.get("/profile", authMiddleware, getUser);

// Saját profil frissítése (id nélkül, csak a bejelentkezett user)
router.patch("/profile", authMiddleware, updateProfile);

// Admin (további jogosultságkezelés kellhet)

// Összes felhasználó lekérése (csak adminoknak)
router.get("/", authMiddleware, getAllUser);

// Felhasználó törlése ID alapján (csak admin)
router.delete("/:id", authMiddleware, deleteUser);

export default router;
