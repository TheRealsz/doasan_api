import { Router } from "express";
import { createUsuario } from "../controllers/usuarioController";

const router = Router()

router.post("/create", createUsuario)

export default router