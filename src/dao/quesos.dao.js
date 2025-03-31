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
      if (precio <= 0) {
        throw new Error('El precio del queso debe ser mayor a 0')
      }
      if (precio <= 0) {
        throw new Error('La cantidad de quesos  debe ser mayor a 0')
      }
      const pool = await dbConnect
      // verificamos si el queso ya existe!
      const checkResul = await pool
        .request()
        .input('nombre', mssql.NVarChar, nombre)
        .query('SELECT COUNT(*) AS count FROM queso WHERE nombre = @nombre')
      if (checkResul.recordset[0] > 0) {
        throw Error('El nombre de queso ya existe')
      }

      const result = await pool
        .request()
        .input('nombre', mssql.NVarChar, nombre)
        .input('tipo', mssql.NVarChar, tipo)
        .input('peso_unidad_kg', mssql.Decimal, peso_unidad_kg)
        .input('cantidad_disponible', mssql.Decimal, cantidad_disponible)
        .input('ubicacion', mssql.NVarChar, ubicacion)
        .input('precio', mssql.Decimal, precio)
        .query('INSERT INTO queso(nombre, tipo, peso_unidad_kg, cantidad_disponible, ubicacion, precio) values (@nombre, @tipo, @peso_unidad_kg, @cantidad_disponible, @ubicacion, @precio)')
      return { success: true, message: 'creado correctamente' }
    } catch (error) {
      console.error('Error en la creacion:', error)
      throw new Error(error.message)
    }
  }
}

export default QuesosDao
