import { Router } from "express";
import { createAgendamento, getAgendamentosByUser, getAgendamentosQuantity } from "../controllers/agendamentoController";

const router = Router()

router.post("/create/:usuarioId", createAgendamento)
router.post("/getReport", getAgendamentosQuantity)
router.get("/:usuarioId", getAgendamentosByUser)

export default router