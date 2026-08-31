// Importiere die benötigten Module und Controller
import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

// Erstelle einen Router für die Benutzerverwaltung
const router = express.Router();
// Definiere die Routen für die Benutzerverwaltung
router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUserById);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

// Exportiere den Router, damit er in anderen Teilen der Anwendung verwendet werden kann
export default router;

