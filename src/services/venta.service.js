import VentaDao from '../dao/venta.dao.js'
import AppError from '../utils/AppError.js'
/* eslint-disable camelcase */

class VentaService {
  static async registrarVenta (data) {
    const { cedula_cliente, detalles } = data

    if (!cedula_cliente || !Array.isArray(detalles)) {
      throw new AppError('Todos los campos son obligatorios', 400)
    }

    if (!Array.isArray(detalles)) {
      throw new AppError('Detalles deben ser un array', 400)
    }

    const presentacionesPermitidas = ['unidad', 'canasta']
    for (const detalle of detalles) {
      if (!presentacionesPermitidas.includes(detalle.presentacion)) {
        throw new AppError(`Presentación inválida. Debe ser una de: ${presentacionesPermitidas.join(', ')}`, 400)
      }
    }

    try {
      const total_venta = detalles.reduce((sum, detalle) =>
        sum + (detalle.cantidad * detalle.precio_unitario), 0
      )
      const result = await VentaDao.registrarVenta(cedula_cliente, total_venta, detalles)
      return { success: true, message: 'Venta registrada exitosamente' }
    } catch (error) {
      throw new AppError('Error al registrar la venta', 500)
    }
  }

  static async obtenerVentas () {
    try {
      return await VentaDao.obtenerVentas()
    } catch (error) {
      throw new AppError('Error al obtener las ventas', 500)
    }
  }

  static async EliminarVenta (id) {
    try {
      if (typeof id !== 'number') {
        throw new AppError('El ID debe ser un número', 400)
      }

      await VentaDao.EliminarVenta(id)
      return { success: true, message: 'Venta eliminada exitosamente' }
    } catch (error) {
      throw new AppError('Error al eliminar la venta', 500)
    }
  }
}

export default VentaService
