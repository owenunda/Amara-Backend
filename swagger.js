import swaggerAutogen from 'swagger-autogen'

// la plantilla que uso se genera con la documentacion NO es la que se sube al final!
const outpuFile = './GeneraterSwagger.json'
const endPointsFiles = ['./index.js']

const doc = {
  info: {
    title: 'API para el sistema de inventario de AMARA SAS',
    description: 'Esta API permite gestionar todo el sistema de invitenario de la produccion de quesos de la empresa AMARA SAS'
  },
  host: 'localhost:4000',
  schemes: ['http']
}
swaggerAutogen()(outpuFile, endPointsFiles, doc)
