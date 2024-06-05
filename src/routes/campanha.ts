import { Router } from "express";
import { createCampanha } from "../controllers/campanhaController";

const router = Router()

router.post("/create/:usuarioId", createCampanha)

export default router