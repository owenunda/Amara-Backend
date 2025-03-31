/* eslint-disable camelcase */
import ProduccionService from '../services/produccion.service.js'

class produccionController {
  static async registrarProduccion (req, res) {
    try {
      const { id_queso, cantidad_producida, responsable, estado, observaciones, detalles } = req.body
      if (!id_queso || !cantidad_producida || !responsable || !estado || !Array.isArray(detalles)) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios y detalles debe ser un array' })
      }

      // Validar que el estado sea uno de los permitidos
      const estadosPermitidos = ['en proceso', 'finalizado', 'cancelado']
      if (!estadosPermitidos.includes(estado)) {
        return res.status(400).json({ success: false, message: `Estado inválido. Debe ser uno de: ${estadosPermitidos.join(', ')}` })
      }

      // Validar que la unidad de medida en cada detalle sea válida
      const unidadesPermitidas = ['kg', 'g', 'L', 'ml', 'unidad']
      for (const detalle of detalles) {
        if (!detalle.id_materia || !detalle.cantidad_usada || !detalle.unidad_medida) {
          return res.status(400).json({ success: false, message: 'Cada detalle debe contener id_materia, cantidad_usada y unidad_medida' })
        }

        if (!unidadesPermitidas.includes(detalle.unidad_medida)) {
          return res.status(400).json({
            success: false,
            message: `Unidad de medida inválida (${detalle.unidad_medida}). Debe ser una de: ${unidadesPermitidas.join(', ')}`
          })
        }
      }

      const response = await ProduccionService.registrarProduccion(id_queso, cantidad_producida, responsable, estado, observaciones, detalles)

      if (response.success) {
        return res.status(201).json({ message: response.message })
      } else {
        return res.status(500).json({ Error: response.message })
      }
    } catch (error) {
      return res.status(500).json({ Error: 'Error del servidor' })
    }
  }

  static async obtenerProduccion (req, res) {
    try {
      const producciones = await ProduccionService.obtenerProduccion()
      res.status(200).json(producciones)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

export default produccionController
