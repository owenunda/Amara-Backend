import mssql from 'mssql'
import config from './envConfig.js'

// parametros de conexion
const connectionSetting = {
  server: config.dbServer,
  database: config.dbName,
  user: config.dbUser,
  password: config.dbPassword,
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
}

const pool = new mssql.ConnectionPool(connectionSetting)

const dbConnect = pool
  .connect()
  .then((pool) => {
    console.log('Conexión a SQL Server exitosa')
    return pool
  })
  .catch((err) => {
    console.error('Error de conexión a SQL Server:', err)
    process.exit(1)
  })

export { mssql, dbConnect }
