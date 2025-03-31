import express from 'express'
import cors from 'cors'
import routes from './src/routes/routers.js'
import dontenv from 'dotenv'
import swaggerUI from 'swagger-ui-express'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const swaggerDocumentation = require('./swagger.json')

dontenv.config()
const app = express()

app.use(cors())
app.use(express.json())

// rutas
app.use('/api', routes)
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation))

// Puerto de escucha
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`📢 Server is running on port ${PORT}`)
  console.log(`📢 Url: http://localhost:${PORT}`)
})
