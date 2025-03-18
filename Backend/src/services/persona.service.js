import PersonaDao from "../dao/persona.dao.js"

class PersonaService {
  static async obtenerPersonas(){
    return await PersonaDao.obtenerPersonas()
  }

  static async obtenerPersonaPorId(id){
    return await PersonaDao.obtenerPersonaPorId(id)
  }
}

export default PersonaService