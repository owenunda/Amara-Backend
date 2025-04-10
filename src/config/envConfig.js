import dotenv from 'dotenv'

dotenv.config()

const env = process.env

const config = {
  dbServer: env.DB_SERVER,
  dbName: env.DB_NAME,
  dbUser: env.DB_USER,
  dbPassword: env.DB_PASSWORD,
  jwtSecret: env.JWT_SECRET,
  port: env.PORT,
  url: env.URL
}

export default config
