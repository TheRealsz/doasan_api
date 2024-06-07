import { Router } from "express";
import { createAgendamento, getAgendamentosQuantity } from "../controllers/agendamentoController";

const router = Router()

router.post("/create/:usuarioId", createAgendamento)
router.post("/getReport", getAgendamentosQuantity)

export default router