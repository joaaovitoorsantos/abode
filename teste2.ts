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

async function createMoradoresTable() {
  try {
    await connection.promise().query(`
      CREATE TABLE IF NOT EXISTS moradores (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        senha VARCHAR(255) NOT NULL
      )
    `)

    console.log('Tabela "moradores" criada com sucesso.')

    connection.end() // Fecha a conexão com o banco de dados
  } catch (error) {
    console.error('Erro ao criar a tabela "moradores":', error)
  }
}

createMoradoresTable()
