import { Router } from "express";
import { createAgendamento } from "../controllers/agendamentoController";

const router = Router()

router.post("/create/:usuarioId", createAgendamento)

export default router