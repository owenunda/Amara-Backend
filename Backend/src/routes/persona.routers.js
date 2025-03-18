import express from "express"
import personaController  from "../controllers/persona.controller.js"

const router = express.Router()

router.get("/", personaController.getPersonas)
router.get("/:id", personaController.getPersonaPorId)

export default router