import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'

import styles from '@styles/Login.module.css'

import { Button, FormLayout, TextField, Text } from '@shopify/polaris'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/login', { email, senha })
      const user = response.data.user

      localStorage.setItem('abodeId', user.id)
      router.push('/')
    } catch (error) {
      console.error('Erro ao fazer login:', error)
    }
  }

  return (
    <div className={styles.backContainer}>
      <div className={styles.loginContainer}>
        <div className={styles.loginForm}>
          <img src="https://i.imgur.com/seVohFD.png" height={110} alt="Logo" />
          <Text variant="heading2xl" as="h4">
            Login
          </Text>
          <FormLayout>
            <TextField
              autoComplete=""
              label="Usuario"
              type="email"
              value={email}
              onChange={(value) => setEmail(value)}
            />
            <TextField
              autoComplete=""
              label="Senha"
              type="password"
              value={senha}
              onChange={(value) => setSenha(value)}
            />
            <Button primary fullWidth onClick={handleSubmit}>
              Login
            </Button>
            <Text as="h6">
              Não tem conta? <a href="/register">Inscrever-se</a>
            </Text>
          </FormLayout>
        </div>
      </div>
    </div>
  )
}
