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
        return { success: false, message: 'Error: No se pudo obtener el ID de la producción', status: 400 }
      }

      const id_produccion = result.recordset[0].id_produccion_creada
      // Validar existencia de materias primas
      for (const detalle of detalles) {
        const materiaResult = await pool
          .request()
          .input('id_materia', mssql.Int, detalle.id_materia)
          .query('SELECT COUNT(*) AS existe FROM materia_prima WHERE id_materia = @id_materia')

        if (!materiaResult.recordset || materiaResult.recordset[0].existe === 0) {
          return {
            success: false,
            message: `Error: La materia prima con ID ${detalle.id_materia} no existe`,
            status: 400
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
      return { success: false, message: `Error al registrar la produccion: ${error.message}`, status: 400 }
    }
  }

  static async ObtenerProduccion () {
    try {
      const query = `SELECT 
    p.id_produccion,
    q.nombre AS nombre_queso,
    p.fecha_produccion,
    p.cantidad_producida,
    p.peso_total_kg,
    p.responsable,
    p.estado,
    p.observaciones
  FROM 
    produccion p
  JOIN 
    queso q ON p.id_queso = q.id_queso;`

      const pool = await dbConnect
      const result = await pool
        .request()
        .query(query)
      return result.recordset
    } catch (error) {
      return { success: false, message: `Error al obtener la produccion: ${error.message}` }
    }
  }

  static async obtenerProduccionPorId (id) {
    try {
      const pool = await dbConnect
      const result = await pool
        .request()
        .input('id_produccion', mssql.Int, id)
        .query('SELECT * FROM produccion WHERE id_produccion = @id_produccion')
      return result.recordset
    } catch (error) {
      console.error('Error al registrar la compra:', error.message)
      return { success: false, message: `Error al obtener la produccion: ${error.message}` }
    }
  }

  static async eliminarProduccion (id) {
    try {
      const pool = await dbConnect
      await pool
        .request()
        .input('id', mssql.Int, id)
        .query('DELETE FROM produccion WHERE id_produccion = @id ')
      return { success: true, message: 'Eliminado correctamente' }
    } catch (error) {
      return { success: false, message: error.message, status: 400 }
    }
  }

  static async ModificarProduccion (id, id_queso, cantidad_producida, responsable, estado, observaciones) {
    const campos = []
    const pool = await dbConnect
    const request = pool.request().input('id_produccion', mssql.Int, id)

    if (id_queso !== undefined) {
      campos.push('id_queso = @id_queso')
      request.input('id_queso', mssql.Int, id_queso)
    }

    if (cantidad_producida !== undefined) {
      campos.push('cantidad_producida = @cantidad_producida')
      request.input('cantidad_producida', mssql.Int, cantidad_producida)
    }

    if (responsable !== undefined) {
      campos.push('responsable = @responsable')
      request.input('responsable', mssql.NVarChar(100), responsable)
    }
    if (estado !== undefined) {
      campos.push('estado = @estado')
      request.input('estado', mssql.VarChar(20), estado)
    }

    if (observaciones !== undefined) {
      campos.push('observaciones = @observaciones')
      request.input('observaciones', mssql.VarChar(255), observaciones)
    }

    if (campos.length === 0) {
      return { success: false, message: 'No se enviaron campos para actualizar' }
    }

    const query = `UPDATE produccion SET ${campos.join(', ')} WHERE id_produccion = @id_produccion`

    try {
      const result = await request.query(query)
      return { success: true, message: 'Actualización realizada', data: result }
    } catch (error) {
      return { success: false, message: 'Error en la actualización', error: error.message }
    }
  }
}

export default ProduccionDao
