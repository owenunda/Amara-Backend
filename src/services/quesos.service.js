/* eslint-disable camelcase */
import QuesosDao from '../dao/quesos.dao.js'
import AppError from '../utils/AppError.js'

class QuesosService {
  static async registrarQuesos(data) {
    const { nombre, tipo, precio, cantidad_disponible, ubicacion, peso_unidad_kg } = data

    if (!nombre || !tipo || !precio || !cantidad_disponible || !ubicacion || !peso_unidad_kg) {
      throw new AppError('Todos los campos son obligatorios', 400)
    }

    try {
      const result = await QuesosDao.registrarQuesos(nombre, tipo, precio, cantidad_disponible, ubicacion, peso_unidad_kg)
      return { success: true, message: 'Queso registrado exitosamente' }
    } catch (error) {
      throw new AppError('Error al registrar el queso', 500)
    }
  }

  static async obtenerQuesos() {
    try {
      return await QuesosDao.obtenerQuesos()
    } catch (error) {
      throw new AppError('Error al obtener los quesos', 500)
    }
  }

  static async obtenerQuesoPorId(id) {
    try {
      const queso = await QuesosDao.obtenerQuesoPorId(id)
      if (!queso) {
        throw new AppError('Queso no encontrado', 404)
      }
      return queso
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al obtener el queso', 500)
    }
  }

  static async ModificarQueso(id, nombre, tipo, precio, cantidad_disponible, ubicacion, peso_unidad_kg) {
    try {
      const queso = await QuesosDao.obtenerQuesoPorId(id)
      if (!queso) {
        throw new AppError('Queso no encontrado', 404)
      }

      const result = await QuesosDao.ModificarQueso(id, nombre, tipo, precio, cantidad_disponible, ubicacion, peso_unidad_kg)
      return { success: true, message: 'Queso modificado exitosamente' }
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al modificar el queso', 500)
    }
  }

  static async eliminarQueso(id) {
    try {
      const queso = await QuesosDao.obtenerQuesoPorId(id)
      if (!queso) {
        throw new AppError('Queso no encontrado', 404)
      }

      const result = await QuesosDao.eliminarQueso(id)
      return { success: true, message: 'Queso eliminado exitosamente' }
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al eliminar el queso', 500)
    }
  }
}

export default QuesosService
