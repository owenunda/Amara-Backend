import { mssql, dbConnect } from '../config/conenectionSQLServer.js'

class PersonaDao {
  static async obtenerPersonas () {
    const pool = await dbConnect
    const result = await pool.request().query('SELECT * FROM persona')
    return result.recordset
  }

  static async obtenerPersonaPorId (id) {
    const pool = await dbConnect
    const result = await pool.request()
      .input('id', mssql.Int, id)
      .query('SELECT * FROM persona WHERE id_persona = @id')
    return result.recordset[0]
  }

  static async eliminarPersona (id) {
    try {
      const pool = await dbConnect
      await pool
        .request()
        .input('id', mssql.Int, id)
        .query('DELETE FROM persona WHERE id_persona = @id')
      return { success: true, message: 'Eliminado correctamente' }
    } catch (error) {
      return { success: false, message: error.message, status: 400 }
    }
  }
}

export default PersonaDao
