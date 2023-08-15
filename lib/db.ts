import mysql from 'mysql2'

const databaseUrl = process.env.DATABASE_URL

const dbConfig = {
  uri: databaseUrl,
  ssl: {
    rejectUnauthorized: false, // Isso permite conexões SSL/TLS não verificadas
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}

const pool = mysql.createPool(dbConfig)

export function getConnection() {
  return pool
}
