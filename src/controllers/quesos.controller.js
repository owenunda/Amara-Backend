/* eslint-disable camelcase */
import QuesosService from '../services/quesos.service.js'

class quesosController {
  static async registrarQuesos (req, res) {
    try {
      const { nombre, tipo, cantidad_disponible, ubicacion, precio } = req.body
      if (!nombre || !tipo || !cantidad_disponible || !ubicacion || !precio) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' })
      }
      const peso_unidad_kg = 2.5
      const response = await QuesosService.registrarQuesos(nombre, tipo, peso_unidad_kg, cantidad_disponible, ubicacion, precio)
      if (response.success) {
        return res.status(201).json({ message: response.message })
      } else {
        return res.status(500).json({ Error: response.message })
      }
    } catch (error) {
      return res.status(500).json({ Error: 'Error del servidor' })
    }
  }

  static async obtenerQuesos (req, res) {
    try {
      const quesos = await QuesosService.obtenerQuesos()
      res.status(200).json(quesos)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

export default quesosController
