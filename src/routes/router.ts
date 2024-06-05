import { Router } from "express";
import usuarioRoutes from "./usuario"
import agendamentoRoutes from "./agendamento"
import campanhaRoutes from "./campanha"

const router = Router()

router.use("/usuario", usuarioRoutes)
router.use("/agendamento", agendamentoRoutes)
router.use("/campanha", campanhaRoutes)

export default router