/* eslint-disable camelcase */
import { dbConnect, mssql } from '../config/conenectionSQLServer.js'

class ProduccionDao {
  static async registrarProduccion (id_queso, cantidad_producida, responsable, estado, observaciones, detalles) {
    try {
      const pool = await dbConnect
      const result = await pool
        .request()
        .input('id_queso', mssql.Int, id_queso)
        .input('cantidad_producida', mssql.Int, cantidad_producida)
        .input('responsable', mssql.NVarChar(100), responsable)
        .input('estado', mssql.NVarChar(20), estado)
        .input('observaciones', mssql.NVarChar(255), observaciones)
        .execute('sp_insertar_produccion')
      // Validar si se obtuvo el ID correctamente
      if (!result.recordset || result.recordset.length === 0) {
        return { success: false, message: 'Error: No se pudo obtener el ID de la producción' }
      }

      const id_produccion = result.recordset[0].id_produccion_creada
      // Validar que todas las materias primas existan
      // Validar existencia de materias primas
      for (const detalle of detalles) {
        const materiaResult = await pool
          .request()
          .input('id_materia', mssql.Int, detalle.id_materia)
          .query('SELECT COUNT(*) AS existe FROM materia_prima WHERE id_materia = @id_materia')

        if (!materiaResult.recordset || materiaResult.recordset[0].existe === 0) {
          return {
            success: false,
            message: `Error: La materia prima con ID ${detalle.id_materia} no existe`
          }
        }
      }

      // Insertar los detalles de la produccion
      for (const detalle of detalles) {
        await pool
          .request()
          .input('id_produccion', mssql.Int, id_produccion)
          .input('id_materia', mssql.Int, detalle.id_materia)
          .input('cantidad_usada', mssql.Decimal(10, 2), detalle.cantidad_usada)
          .input('unidad_medida', mssql.NVarChar(20), detalle.unidad_medida)
          .query(
      `INSERT INTO detalles_produccion (id_produccion, id_materia, cantidad_usada, unidad_medida) 
      VALUES (@id_produccion, @id_materia, @cantidad_usada, @unidad_medida)`
          )
      }
      return { success: true, message: 'produccion registrada correctamente' }
    } catch (error) {
      console.error('Error al registrar la compra:', error.message)
      return { success: false, message: `Error al registrar la produccion: ${error.message}` }
    }
  }

  static async ObtenerProduccion () {
    try {
      const pool = await dbConnect
      const result = await pool
        .request()
        .query('SELECT * FROM produccion')
      return result.recordset
    } catch (error) {
      console.error('Error al registrar la compra:', error.message)
      return { success: false, message: `Error al obtener la produccion: ${error.message}` }
    }
  }
}

export default ProduccionDao
