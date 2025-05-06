import compraDao from '../dao/compra.dao.js'
import AppError from '../utils/AppError.js'
/* eslint-disable camelcase */

class CompraService {
  static async registrarCompra(data) {
    const { cedula_proveedor, metodo_pago, observaciones, detalles } = data

    if (!cedula_proveedor || !metodo_pago || !detalles || !observaciones) {
      throw new AppError('Todos los campos son obligatorios', 400)
    }

    // Validar que cada materia prima tenga los campos necesarios
    for (const detalle of detalles) {
      if (!detalle.id_materia || !detalle.cantidad || !detalle.precio_unitario) {
        throw new AppError('Cada detalle debe contener id_materia, cantidad y precio_unitario', 400)
      }
    }

    try {
      const total = detalles.reduce((sum, detalle) =>
        sum + (detalle.cantidad * detalle.precio_unitario), 0
      )

      const result = await compraDao.registrarCompra(cedula_proveedor, metodo_pago, observaciones, detalles, total)
      return { success: true, message: 'Compra registrada exitosamente' }
    } catch (error) {
      throw new AppError('Error al registrar la compra', 500)
    }
  }

  static async ObtenerCompras() {
    try {
      return await compraDao.ObtenerCompras()
    } catch (error) {
      throw new AppError('Error al obtener las compras', 500)
    }
  }

  static async EliminarCompra(id) {
    try {
      const result = await compraDao.EliminarCompra(id)
      return { success: true, message: 'Compra eliminada exitosamente' }
    } catch (error) {
      throw new AppError('Error al eliminar la compra', 500)
    }
  }
}

export default CompraService
