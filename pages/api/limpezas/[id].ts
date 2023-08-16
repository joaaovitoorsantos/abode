import { getConnection } from '@lib/db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Verificar se o método HTTP é DELETE
  if (req.method !== 'DELETE') {
    return res.status(405).end() // Método não permitido
  }

  const connection = getConnection()

  // Pegar o ID da URL
  const idToDelete = req.query.id

  connection.query('DELETE FROM limpezas WHERE id = ?', [idToDelete], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao deletar limpeza.' })
    }
    res.json({ message: 'Limpeza deletada com sucesso.' })
  })
}
