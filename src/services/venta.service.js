import VentaDao from '../dao/venta.dao.js'
/* eslint-disable camelcase */

class VentaService {
  static async registrarVenta (data) {
    const { cedula_cliente, detalles } = data

    if (!cedula_cliente || !Array.isArray(detalles)) {
      return { success: false, message: 'Todos los campos son obligatorios', status: 400 }
    }

    if (!Array.isArray(detalles)) {
      return { success: false, message: 'detalles deben ser un array', status: 400 }
    }

    const presentacionesPermitidas = ['unidad', 'canasta']
    for (const detalle of detalles) {
      if (!presentacionesPermitidas.includes(detalle.presentacion)) {
        return { success: false, message: `Estado inválido. Debe ser uno de: ${presentacionesPermitidas.join(', ')}`, status: 400 }
      }
    }
    const total_venta = detalles.reduce((sum, detalle) =>
      sum + (detalle.cantidad * detalle.precio_unitario), 0
    )
    return await VentaDao.registrarVenta(cedula_cliente, total_venta, detalles)
  }
}

export default VentaService
