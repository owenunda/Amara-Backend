import compraDao from '../dao/compra.dao.js'
/* eslint-disable camelcase */
class CompraService {
  static async registrarCompra (data) {
    const { cedula_proveedor, metodo_pago, observaciones, detalles } = data

    if (!cedula_proveedor || !metodo_pago || !detalles || !observaciones) {
      return { success: false, message: 'Todos los campos son obligatorios', status: 400 }
    }
    // Validar que cada materia prima tenga los campos necesarios
    for (const detalle of detalles) {
      if (!detalle.id_materia || !detalle.cantidad || !detalle.precio_unitario) {
        return { success: false, message: 'Cada detalle debe contener id_materia, cantidad y precio_unitario', status: 400 }
      }
    }
    const total = detalles.reduce((sum, detalle) =>
      sum + (detalle.cantidad * detalle.precio_unitario), 0
    )

    return await compraDao.registrarCompra(cedula_proveedor, metodo_pago, observaciones, detalles, total)
  }

  static async ObtenerCompras () {
    return await compraDao.ObtenerCompras()
  }

  static async EliminarCompra (id) {
    return await compraDao.EliminarCompra(id)
  }
}

export default CompraService
