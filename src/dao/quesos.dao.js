/* eslint-disable camelcase */
import { mssql, dbConnect } from '../config/conenectionSQLServer.js'

class QuesosDao {
  static async obtenerQuesos () {
    const pool = await dbConnect
    const result = await pool.request().query('SELECT * FROM queso')
    return result.recordset
  }

  static async registrarQueso (nombre, tipo, peso_unidad_kg, cantidad_disponible, ubicacion, precio) {
    try {
      const pool = await dbConnect
      // verificamos si el queso ya existe!
      const checkResul = await pool
        .request()
        .input('nombre', mssql.NVarChar, nombre)
        .query('SELECT COUNT(*) AS count FROM queso WHERE nombre = @nombre')
      if (checkResul.recordset[0].count > 0) {
        return { success: false, message: 'El nombre de queso ya existe', status: 400 }
      }

      await pool
        .request()
        .input('nombre', mssql.NVarChar, nombre)
        .input('tipo', mssql.NVarChar, tipo)
        .input('peso_unidad_kg', mssql.Decimal(10, 2), peso_unidad_kg)
        .input('cantidad_disponible', mssql.Decimal(10, 2), cantidad_disponible)
        .input('ubicacion', mssql.NVarChar, ubicacion)
        .input('precio', mssql.Decimal, precio)
        .query('INSERT INTO queso(nombre, tipo, peso_unidad_kg, cantidad_disponible, ubicacion, precio) values (@nombre, @tipo, @peso_unidad_kg, @cantidad_disponible, @ubicacion, @precio)')
      return { success: true, message: 'creado correctamente' }
    } catch (error) {
      return { success: false, message: error.message, status: 400 }
    }
  }

  static async eliminarQueso (id) {
    try {
      const pool = await dbConnect
      await pool
        .request()
        .input('id', mssql.Int, id)
        .query('DELETE FROM queso WHERE id_queso = @id')
    } catch (error) {

    }
  }

  static async obtenerQuesoPorId (id) {
    try {
      const pool = await dbConnect
      const result = await pool
        .request()
        .input('id_queso', mssql.Int, id)
        .query('SELECT * FROM queso WHERE id_queso = @id_queso')
      return result.recordset
    } catch (error) {
      return { success: false, message: `Error al obtener el queso: ${error.message}` }
    }
  }

  static async ModificarQueso (id, nombre, tipo, precio, cantidad_disponible, ubicacion, peso_unidad_kg) {
    const campos = []
    const pool = await dbConnect
    const request = pool.request().input('id_queso', mssql.Int, id)

    if (nombre !== undefined) {
      campos.push('nombre = @nombre')
      request.input('nombre', mssql.VarChar(100), nombre)
    }

    if (tipo !== undefined) {
      campos.push('tipo = @tipo')
      request.input('tipo', mssql.VarChar(50), tipo)
    }

    if (peso_unidad_kg !== undefined) {
      campos.push('peso_unidad_kg = @peso_unidad_kg')
      request.input('peso_unidad_kg', mssql.Decimal(10, 2), peso_unidad_kg)
    }
    if (precio !== undefined) {
      campos.push('precio = @precio')
      request.input('precio', mssql.Decimal(10, 2), precio)
    }

    if (cantidad_disponible !== undefined) {
      campos.push('cantidad_disponible = @cantidad_disponible')
      request.input('cantidad_disponible', mssql.Decimal(10, 2), cantidad_disponible)
    }

    if (ubicacion !== undefined) {
      campos.push('ubicacion = @ubicacion')
      request.input('ubicacion', mssql.VarChar(255), ubicacion)
    }

    if (campos.length === 0) {
      return { success: false, message: 'No se enviaron campos para actualizar' }
    }

    const query = `UPDATE queso SET ${campos.join(', ')} WHERE id_queso = @id_queso`

    try {
      const result = await request.query(query)
      return { success: true, message: 'Actualización realizada', data: result }
    } catch (error) {
      console.log(error)
      return { success: false, message: 'Error en la actualización', error: error.message }
    }
  }
}

export default QuesosDao
