import { dbConnect, mssql } from '../config/conenectionSQLServer.js'
/* eslint-disable camelcase */

class VentaDao {
  static async registrarVenta (cedula_cliente, total_venta, detalles) {
    try {
      const pool = await dbConnect

      // insertamos venta
      const result = await pool
        .request()
        .input('cedula_cliente', mssql.VarChar(20), cedula_cliente)
        .input('total_venta', mssql.Decimal(10, 2), total_venta)
        .execute('sp_RegistrarVenta')

      const id_venta = result.recordset[0].id_venta

      // validamos que todos los quesos existan
      for (const detalle of detalles) {
        const quesoResult = await pool
          .request()
          .input('id_queso', mssql.Int, detalle.id_queso)
          .query('SELECT COUNT(*) AS existe FROM queso WHERE id_queso = @id_queso')

        if (quesoResult.recordset[0].existe === 0) {
          return {
            success: false,
            message: `Error: el quso con ID ${detalle.id_queso} no existe`,
            status: 400
          }
        }
      }

      // insertamos los detalles de la venta
      for (const detalle of detalles) {
        await pool
          .request()
          .input('id_venta', mssql.Int, id_venta)
          .input('id_queso', mssql.Int, detalle.id_queso)
          .input('presentacion', mssql.VarChar(20), detalle.presentacion)
          .input('cantidad', mssql.Decimal(10, 2), detalle.cantidad)
          .input('precio_unitario', mssql.Decimal(10, 2), detalle.precio_unitario)
          .query(
            `INSERT INTO detalles_venta (id_venta, id_queso, presentacion,cantidad, precio_unitario) 
            VALUES (@id_venta, @id_queso,@presentacion, @cantidad, @precio_unitario)`
          )
      }

      return { success: true, message: `La venta se registro correctamente , ID: ${id_venta}` }
    } catch (error) {
      return { success: false, message: `Error al registrar la venta: ${error.message}`, status: 400 }
    }
  }

  static async obtenerVentas () {
    try {
      const pool = await dbConnect
      const result = await pool
        .request()
        .execute('ObtenerVentasConCliente')
      return result.recordset
    } catch (error) {

    }
  }
}

export default VentaDao
