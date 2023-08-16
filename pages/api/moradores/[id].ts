/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { getConnection } from '@lib/db'
import { NextApiRequest, NextApiResponse } from 'next'

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
    'SELECT nome, avatar FROM moradores WHERE id = ?',
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
