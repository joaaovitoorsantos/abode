import { getConnection } from '@lib/db' // Importe a função de conexão com o banco de dados
import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { email, senha } = req.body

    const connection = getConnection()
    connection.query(
      'SELECT * FROM moradores WHERE email = ?',
      [email],
      (err, results) => {
        if (err || results.length === 0) {
          return res.status(401).json({ error: 'Credenciais inválidas.' })
        }

        const user = results[0]
        bcrypt.compare(senha, user.senha, (err, isMatch) => {
          if (err || !isMatch) {
            return res.status(401).json({ error: 'Credenciais inválidas.' })
          }

          // Aqui, você pode adicionar a lógica para gerar um token de autenticação
          // e enviá-lo ao cliente

          res.json({ user })
        })
      },
    )
  } else {
    res.status(405).end() // Método não permitido
  }
}
