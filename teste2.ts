/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
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

async function createLimpezasTable() {
  try {
    await connection.promise().query(`
      CREATE TABLE IF NOT EXISTS limpezas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        dia VARCHAR(255) NOT NULL,
        tarefa VARCHAR(255) NOT NULL
      )
    `)

    console.log('Tabela "limpezas" criada com sucesso.')

    connection.end() // Fecha a conexão com o banco de dados
  } catch (error) {
    console.error('Erro ao criar a tabela "limpezas":', error)
  }
}

createLimpezasTable()
