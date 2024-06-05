import { Router } from "express";
import usuarioRoutes from "./usuario"
import agendamentoRoutes from "./agendamento"

const router = Router()

router.use("/usuario", usuarioRoutes)
router.use("/agendamento", agendamentoRoutes)

export default router