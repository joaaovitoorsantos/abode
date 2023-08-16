import { Button, FormLayout, TextField } from '@shopify/polaris'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Register() {
  const router = useRouter()
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
  })

  const handleChange = (value: string, id: string) => {
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
    <>
      <FormLayout>
        <TextField
          name="nome"
          label="nome"
          value={form.nome}
          onChange={(value) => handleChange(value, 'nome')}
          autoComplete="on"
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={(value) => handleChange(value, 'email')}
          autoComplete="on"
        />
        <TextField
          name="senha"
          label="senha"
          type="password"
          value={form.senha}
          onChange={(value) => handleChange(value, 'senha')}
          autoComplete="on"
        />
        <Button onClick={handleSubmit}>Register</Button>
      </FormLayout>
    </>
  )
}
