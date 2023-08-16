import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'

import styles from '@styles/Login.module.css' // A mesma folha de estilo da página de login

import { Button, FormLayout, TextField, Text } from '@shopify/polaris'

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
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <img src="https://i.imgur.com/seVohFD.png" height={110} alt="Logo" />
        <Text variant="heading2xl" as="h4">
          Criar uma conta
        </Text>
        <FormLayout>
          <TextField
            name="nome"
            label="Nome"
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
            label="Senha"
            type="password"
            value={form.senha}
            onChange={(value) => handleChange(value, 'senha')}
            autoComplete="on"
          />
          <Button fullWidth primary onClick={handleSubmit}>
            Registrar
          </Button>
          <Text as="h6">
            Já tem uma conta? <a href="/login">Faça login</a>
          </Text>
        </FormLayout>
      </div>
    </div>
  )
}
