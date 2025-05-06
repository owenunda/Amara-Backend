import AppError from '../utils/AppError.js'

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    })
  } else {
    // Producción
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      })
    } else {
      // Error de programación: no enviar detalles al cliente
      console.error('ERROR 💥', err)
      res.status(500).json({
        status: 'error',
        message: 'Algo salió mal'
      })
    }
  }
}

// Middleware para manejar rutas no encontradas
export const notFound = (req, res, next) => {
  next(new AppError(`No se encontró la ruta: ${req.originalUrl}`, 404))
}

export default errorHandler 