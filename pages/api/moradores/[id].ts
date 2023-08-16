import { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2'
import { getConnection } from '@lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query

  if (!id) {
    return res.status(400).json({ error: 'ID é necessário.' })
  }

  const connection = getConnection()
  connection.query(
    'SELECT nome FROM moradores WHERE id = ?',
    [id],
    (error, results) => {
      if (error) {
        console.error(error)
        return res.status(500).json({ error: 'Erro ao buscar morador.' })
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'Morador não encontrado.' })
      }

      return res.status(200).json(results[0])
    },
  )
}
