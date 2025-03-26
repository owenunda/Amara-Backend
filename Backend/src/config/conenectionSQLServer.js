import mssql from 'mssql'
import dotenv from 'dotenv'

dotenv.config()
// parametros de conexion
const connectionSetting = {
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  option: {
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
