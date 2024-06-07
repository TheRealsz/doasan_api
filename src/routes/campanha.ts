import { Router } from "express";
import { createCampanha, getCampanhas } from "../controllers/campanhaController";
import upload from "../config/multer";

const router = Router()

router.post("/create/:usuarioId", upload.single("file") , createCampanha)
router.get("/get", getCampanhas)

export default router