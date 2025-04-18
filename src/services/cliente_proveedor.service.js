/* eslint-disable camelcase */
import cliente_proveedorDao from '../dao/cliente_proveedor.dao.js'

class Cliente_proveedorService {
  static async create (data) {
    const { cedula_nit, nombre, apellido, celular, tipo_persona, edad, direccion, correo, tipo_relacion } = data

    // Validación de campos obligatorios (movido del controller)
    if (!cedula_nit || !nombre || !celular || !tipo_persona || !direccion || !correo || !tipo_relacion) {
      return { success: false, message: 'Todos los campos son obligatorios', status: 400 }
    }

    // Validación de tipos permitidos (movido del DAO)
    const tiposPersonaValidos = ['juridica', 'natural']
    const tiposRelacionValidos = ['cliente', 'proveedor']

    if (!tiposPersonaValidos.includes(tipo_persona.toLowerCase())) {
      return { success: false, message: "El tipo de persona debe ser 'juridica' o 'natural'", status: 400 }
    }

    if (!tiposRelacionValidos.includes(tipo_relacion.toLowerCase())) {
      return { success: false, message: "El tipo de relación debe ser 'cliente' o 'proveedor'", status: 400 }
    }

    return await cliente_proveedorDao.create(cedula_nit, nombre, apellido, celular, tipo_persona, edad, direccion, correo, tipo_relacion)
  }

  static async obtenerClientes () {
    return await cliente_proveedorDao.obtenerClientes()
  }

  static async obtenerProveedores () {
    return await cliente_proveedorDao.obtenerProveedores()
  }
}

export default Cliente_proveedorService
