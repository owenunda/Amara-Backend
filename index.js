import express from 'express'
import cors from 'cors'
import routes from './src/routes/router.js'
import swaggerUI from 'swagger-ui-express'
import { createRequire } from 'module'
import config from './src/config/envConfig.js'
import errorHandler, { notFound } from './src/middlewares/error.middleware.js'

const require = createRequire(import.meta.url)
const swaggerDocumentation = require('./swagger.json')
// const swaggerDocumentationTest = require('./GeneraterSwagger.json')

const app = express()

app.use(cors())
app.use(express.json())

// rutas
app.use('/api', routes)
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation))

// Middleware para manejar rutas no encontradas
app.use(notFound)

// Middleware de manejo de errores
app.use(errorHandler)

// Puerto de escucha
const PORT = config.port || 3000
app.listen(PORT, () => {
  console.log(`📢 Server is running on port ${PORT}`)
  console.log(`📢 Url: http://localhost:${PORT}`)
})
