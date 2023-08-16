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
  const connection = getConnection()

  switch (req.method) {
    case 'GET':
      connection.query('SELECT * FROM limpezas', [], (err, results) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao recuperar limpezas.' })
        }
        res.json(results)
      })
      break

    case 'POST':
      const { tarefa } = req.body
      connection.query(
        'INSERT INTO limpezas (tarefa) VALUES (?)',
        [tarefa],
        (err) => {
          if (err) {
            return res.status(500).json({ error: 'Erro ao inserir limpeza.' })
          }
          res.status(201).json({ message: 'Limpeza inserida com sucesso.' })
        },
      )
      break

    case 'PUT':
      const { id: idToUpdate, tarefa: updatedTarefa } = req.body
      connection.query(
        'UPDATE limpezas SET tarefa = ? WHERE id = ?',
        [updatedTarefa, idToUpdate],
        (err) => {
          if (err) {
            return res.status(500).json({ error: 'Erro ao atualizar limpeza.' })
          }
          res.json({ message: 'Limpeza atualizada com sucesso.' })
        },
      )
      break

    default:
      res.status(405).end() // Método não permitido
  }
}
