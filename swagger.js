import swaggerAutogen from 'swagger-autogen'

const outpuFile = './swagger.json'
const endPointsFiles = ['./index.js']

const doc = {
  info: {
    title: 'API para el sistema de inventario de AMARA SAS',
    description: 'Esta API permite gestionar todo el sistema de invitenario de la produccion de quesos de la empresa AMARA SAS'
  },
  host: 'localhost:4000',
  schema: ['https']
}
swaggerAutogen()(outpuFile, endPointsFiles, doc)
