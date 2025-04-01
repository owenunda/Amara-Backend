import { dbConnect, mssql } from '../config/conenectionSQLServer.js'
/* eslint-disable camelcase */
class CreateClienteProveedorDao {
  static async create (
    cedula_nit,
    nombre,
    apellido,
    celular,
    tipo_persona,
    edad,
    direccion,
    correo,
    tipo_relacion
  ) {
    try {
      const pool = await dbConnect
      // verificamos si ya existe una pesona con esa cedula
      const checkQuery = 'SELECT COUNT(*) AS count FROM persona WHERE cedula_nit = @cedula_nit'
      const checkResult = await pool
        .request()
        .input('cedula_nit', mssql.VarChar(20), cedula_nit)
        .query(checkQuery)
      if (checkResult.recordset[0].count > 0) {
        return { success: false, message: 'Esta persona ya está registrada en el sistema.' }
      }

      // si no existe la insertamos
      await pool
        .request()
        .input('cedula_nit', mssql.VarChar(20), cedula_nit)
        .input('nombre', mssql.VarChar(50), nombre)
        .input('apellido', mssql.VarChar(50), apellido)
        .input('celular', mssql.VarChar(15), celular)
        .input('tipo_persona', mssql.VarChar(10), tipo_persona)
        .input('edad', mssql.Int, edad)
        .input('direccion', mssql.NVarChar(255), direccion)
        .input('correo', mssql.NVarChar(100), correo)
        .input('tipo_relacion', mssql.VarChar(10), tipo_relacion)
        .query(
          'EXEC sp_insertar_persona_con_relacion @cedula_nit, @nombre, @apellido, @celular, @tipo_persona, @edad, @direccion, @correo, @tipo_relacion'
        )
      return { success: true, message: 'creado correctamente' }
    } catch (error) {
      console.error('Error en la creacion:', error)
      throw new Error(error.message)
    }
  }
}

export default CreateClienteProveedorDao
