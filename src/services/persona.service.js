/* eslint-disable camelcase */
import PersonaDao from '../dao/persona.dao.js'

class PersonaService {
  static async obtenerPersonas () {
    return await PersonaDao.obtenerPersonas()
  }

  static async obtenerPersonaPorId (id) {
    return await PersonaDao.obtenerPersonaPorId(id)
  }

  static async eliminarPersona (id) {
    return await PersonaDao.eliminarPersona(id)
  }

  static async modificarPersona (id, cedula_nit, nombre, apellido, celular, tipo_persona, edad, direccion, correo) {
    return await PersonaDao.modificarPersona(id, cedula_nit, nombre, apellido, celular, tipo_persona, edad, direccion, correo)
  }
}

export default PersonaService
