const dotenv = require('dotenv')
const mysql = require('mysql2')

dotenv.config() // Carrega as variáveis de ambiente do .env

const databaseUrl = process.env.DATABASE_URL

const connection = mysql.createConnection({
  uri: databaseUrl,
  ssl: {
    rejectUnauthorized: false, // Isso permite conexões SSL/TLS não verificadas
  },
})

async function getUserData() {
  try {
    const [rows, fields] = await connection
      .promise()
      .query('SELECT * FROM User')

    console.log('Registros da tabela User:')
    console.log(rows)

    connection.end() // Fecha a conexão com o banco de dados
  } catch (error) {
    console.error('Erro ao obter registros da tabela User:', error)
  }
}

getUserData()
