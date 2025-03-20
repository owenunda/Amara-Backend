import { dbConnect, mssql } from '../config/conenectionSQLServer.js';

const getUserByUsername = async (nombre_usuario) => {
  try {
    const pool = await dbConnect
    const result = await pool.request()
      .input('nombre_usuario', mssql.VarChar, nombre_usuario)
      .query('SELECT id_usuario, nombre_usuario, password, rol FROM usuario WHERE nombre_usuario = @nombre_usuario')
    return result.recordset[0]

  } catch (error) {
    console.error('Error en getUserByUsername:', error)
    throw error
  }
}

export {getUserByUsername}