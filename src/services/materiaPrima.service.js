import MateriaPrimaDao from '../dao/materiaPrima.dao.js'
import AppError from '../utils/AppError.js'

class MateriaPrimaService {
  static async obtenerMateriasPrimas () {
    try {
      return await MateriaPrimaDao.obtenerMateriasPrimas()
    } catch (error) {
      throw new AppError('Error al obtener las materias primas', 500)
    }
  }

  static async obtenerIdMateriasPrimas () {
    try {
      return await MateriaPrimaDao.obtenerIdMateriasPrimas()
    } catch (error) {
      throw new AppError('Error al obtener los IDs de las materias primas', 500)
    }
  }
}

export default MateriaPrimaService
