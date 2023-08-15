import { Button, FormLayout, TextField } from '@shopify/polaris'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Register() {
  const router = useRouter()
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
  })

  const handleChange = (value, id) => {
    setForm((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async () => {
    try {
      await axios.post('/api/register', form)
      router.push('/login') // Redirecionar para a página de login
    } catch (error) {
      console.error('Erro ao registrar:', error)
    }
  }

  return (
    <div>
      <FormLayout>
        <TextField
          name="nome"
          label="nome"
          value={form.nome}
          onChange={(value) => handleChange(value, 'nome')}
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={(value) => handleChange(value, 'email')}
        />
        <TextField
          name="senha"
          label="senha"
          type="password"
          value={form.senha}
          onChange={(value) => handleChange(value, 'senha')}
        />
        <Button onClick={handleSubmit}>Register</Button>
      </FormLayout>
    </div>
  )
}
