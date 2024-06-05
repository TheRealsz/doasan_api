import { Router } from "express";
import { createAgendamento } from "../controllers/agendamentoController";

const router = Router()

router.post("/create/:doadorId", createAgendamento)

export default router