/* eslint-disable camelcase */
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

  static async modificarPersona (id, cedula_nit, nombre, apellido, celular, tipo_persona, edad, direccion, correo) {
    const campos = []

    const pool = await dbConnect
    const request = pool.request().input('id_persona', mssql.Int, id)

    if (cedula_nit !== undefined) {
      campos.push('cedula_nit = @cedula_nit')
      request.input('cedula_nit', mssql.VarChar(20), cedula_nit)
    }
    if (nombre !== undefined) {
      campos.push('nombre = @nombre')
      request.input('nombre', mssql.VarChar(50), nombre)
    }
    if (apellido !== undefined) {
      campos.push('apellido = @apellido')
      request.input('apellido', mssql.VarChar(50), apellido)
    }
    if (celular !== undefined) {
      campos.push('celular = @celular')
      request.input('celular', mssql.VarChar(15), celular)
    }
    if (tipo_persona !== undefined) {
      campos.push('tipo_persona = @tipo_persona')
      request.input('tipo_persona', mssql.VarChar(10), tipo_persona)
    }
    if (edad !== undefined) {
      campos.push('edad = @edad')
      request.input('edad', mssql.Int, edad)
    }
    if (direccion !== undefined) {
      campos.push('direccion = @direccion')
      request.input('direccion', mssql.NVarChar(255), direccion)
    }
    if (correo !== undefined) {
      campos.push('correo = @correo')
      request.input('correo', mssql.NVarChar(100), correo)
    }

    if (campos.length === 0) {
      return { success: false, message: 'No se enviaron campos para actualizar' }
    }

    const query = `UPDATE persona SET ${campos.join(', ')} WHERE id_persona = @id_persona`
    try {
      const result = await request.query(query)
      return { success: true, message: 'Actualización realizada', data: result }
    } catch (error) {
      return { success: false, message: 'Error en la actualización', error: error.message }
    }
  }
}

export default PersonaDao
