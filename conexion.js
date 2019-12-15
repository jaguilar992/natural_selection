const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()
const conexion = mysql.createPool({
  connectionLimit: 10,
  host: process.env.databaseHost,
  port: process.env.databasePort,
  database: process.env.databaseName,
  user: process.env.databaseUser,
  password: process.env.databasePass
})

module.exports = conexion
