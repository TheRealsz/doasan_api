import { Router } from "express";
import usuarioRoutes from "./usuario"

const router = Router()

router.use("/usuario", usuarioRoutes)

export default router