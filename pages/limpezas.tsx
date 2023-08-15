import { DataTable } from '@shopify/polaris'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Limpezas() {
  const [limpezas, setLimpezas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Supondo que você tem uma rota de API para buscar a informação de limpezas
    axios
      .get('/api/limpezas')
      .then((response) => {
        setLimpezas(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Erro ao buscar limpezas:', error)
        setLoading(false)
      })
  }, [])

  const rows = limpezas.map((limpeza) => [limpeza.data, limpeza.nomeMorador])

  return (
    <div>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <DataTable
          columnContentTypes={['text', 'text']}
          headings={['Segunda', 'Morador Responsável']}
          rows={rows}
        />
      )}
    </div>
  )
}
