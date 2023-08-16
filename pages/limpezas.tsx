/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
  Button,
  DataTable,
  Icon,
  Modal,
  Page,
  TextField,
} from '@shopify/polaris'
import { DeleteMajor, EditMajor } from '@shopify/polaris-icons'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Limpezas() {
  const [limpezas, setLimpezas] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [tarefa, setTarefa] = useState('')
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    axios.get('/api/limpezas').then((response) => {
      setLimpezas(response.data)
      setLoading(false)
    })
  }, [])

  const fetchLimpezas = () => {
    setLoading(true)
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
  }

  useEffect(() => {
    fetchLimpezas()
  }, [])

  const rows = limpezas.map(({ id, tarefa }) => [
    tarefa,
    <>
      <Button
        plain
        icon={<Icon source={EditMajor} color="warning" backdrop />}
        onClick={() => handleEditClick(id)}
      />
      <Button
        plain
        icon={<Icon source={DeleteMajor} color="critical" backdrop />}
        onClick={() => handleDelete(id)}
      />
    </>,
  ])

  const handleAddLimpeza = () => {
    axios.post('/api/limpezas', { tarefa }).then(() => {
      setShowAddModal(false)
      setLoading(true)
      axios.get('/api/limpezas').then((response) => {
        setLimpezas(response.data)
        setLoading(false)
      })
    })
  }

  const handleEditClick = (id) => {
    const limpeza = limpezas.find((item) => item.id === id)
    setTarefa(limpeza.tarefa)
    setEditId(id)
    setShowEditModal(true)
  }

  const handleEditLimpeza = () => {
    axios
      .put(`/api/limpezas`, { id: editId, tarefa }) // Enviar ID e tarefa no corpo
      .then(() => {
        setShowEditModal(false)
        fetchLimpezas()
      })
      .catch((error) => console.error('Erro ao editar limpeza:', error))
  }

  const handleDelete = (id) => {
    axios
      .delete(`/api/limpezas/${id}`)
      .then(() => {
        fetchLimpezas()
      })
      .catch((error) => console.error('Erro ao deletar limpeza:', error))
  }
  return (
    <Page
      title="Limpezas"
      primaryAction={{
        content: 'Adicionar limpeza',
        onAction: () => setShowAddModal(true),
      }}
    >
      {loading ? (
        <>Carregando...</>
      ) : (
        <DataTable
          columnContentTypes={['text', 'text']}
          headings={['Tarefas', 'Ações']}
          rows={rows}
        />
      )}

      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Adicionar Limpeza"
        primaryAction={{
          content: 'Adicionar',
          onAction: handleAddLimpeza,
        }}
        secondaryActions={[
          {
            content: 'Cancelar',
            onAction: () => setShowAddModal(false),
          },
        ]}
      >
        <Modal.Section>
          <TextField
            label="Tarefa"
            value={tarefa}
            onChange={(value) => setTarefa(value)}
            autoComplete="on"
          />
        </Modal.Section>
      </Modal>

      <Modal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Editar Limpeza"
        primaryAction={{
          content: 'Editar',
          onAction: handleEditLimpeza,
        }}
        secondaryActions={[
          {
            content: 'Cancelar',
            onAction: () => setShowEditModal(false),
          },
        ]}
      >
        <Modal.Section>
          <TextField
            label="Tarefa"
            value={tarefa}
            onChange={(value) => setTarefa(value)}
            autoComplete="on"
          />
        </Modal.Section>
      </Modal>
    </Page>
  )
}
