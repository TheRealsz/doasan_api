import { Router } from "express";
import { createUsuario, login } from "../controllers/usuarioController";

const router = Router()

router.post("/create", createUsuario)
router.post("/login", login)
router.get("/:usuarioId", getUserProfile);

export default router