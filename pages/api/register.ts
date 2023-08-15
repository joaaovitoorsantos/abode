import { getConnection } from '@lib/db' // Importe a função de conexão com o banco de dados
import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { nome, email, senha } = req.body

    // Hash da senha
    const hashedSenha = await bcrypt.hash(senha, 10)

    const connection = getConnection()
    const insertQuery = `
      INSERT INTO moradores (nome, email, senha)
      VALUES (?, ?, ?)
    `

    connection.query(insertQuery, [nome, email, hashedSenha], (err, result) => {
      if (err) {
        console.error('Erro ao criar a conta:', err)
        return res.status(500).json({ error: 'Erro ao criar a conta.' })
      }

      const newUserId = result.insertId
      res.status(201).json({ id: newUserId })
    })
  } else {
    res.status(405).end() // Método não permitido
  }
}
