import express from "express"
import personaRouters from "./persona.routers.js"

const router = express.Router()

router.use("/personas", personaRouters)

export default router