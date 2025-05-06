/* eslint-disable camelcase */
import cliente_proveedorDao from '../dao/cliente_proveedor.dao.js'
import AppError from '../utils/AppError.js'

class Cliente_proveedorService {
  static async create (data) {
    const { cedula_nit, nombre, apellido, celular, tipo_persona, edad, direccion, correo, tipo_relacion } = data

    // Validación de campos obligatorios
    if (!cedula_nit || !nombre || !celular || !tipo_persona || !direccion || !correo || !tipo_relacion) {
      throw new AppError('Todos los campos son obligatorios', 400)
    }

    // Validación de tipos permitidos
    const tiposPersonaValidos = ['juridica', 'natural']
    const tiposRelacionValidos = ['cliente', 'proveedor']

    if (!tiposPersonaValidos.includes(tipo_persona.toLowerCase())) {
      throw new AppError("El tipo de persona debe ser 'juridica' o 'natural'", 400)
    }

    if (!tiposRelacionValidos.includes(tipo_relacion.toLowerCase())) {
      throw new AppError("El tipo de relación debe ser 'cliente' o 'proveedor'", 400)
    }

    try {
      const result = await cliente_proveedorDao.create(cedula_nit, nombre, apellido, celular, tipo_persona, edad, direccion, correo, tipo_relacion)
      return { success: true, message: 'Registro creado exitosamente' }
    } catch (error) {
      if (error.number === 2627) { // Error de SQL Server para clave duplicada
        throw new AppError('Ya existe un registro con esta cédula/NIT', 400)
      }
      throw error
    }
  }

  static async obtenerClientes () {
    try {
      return await cliente_proveedorDao.obtenerClientes()
    } catch (error) {
      throw new AppError('Error al obtener los clientes', 500)
    }
  }

  static async obtenerProveedores () {
    try {
      return await cliente_proveedorDao.obtenerProveedores()
    } catch (error) {
      throw new AppError('Error al obtener los proveedores', 500)
    }
  }
}

export default Cliente_proveedorService
