import { Button, FormLayout, TextField } from '@shopify/polaris'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/login', { email, senha })
      const user = response.data.user

      // Armazene o ID do usuário no local storage
      localStorage.setItem('userId', user.id)
      // Implementar lógica de autenticação aqui, por exemplo, salvar token
      router.push('/') // Redirecionar para a página inicial
    } catch (error) {
      console.error('Erro ao fazer login:', error)
    }
  }

  return (
    <>
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
        <Button onClick={handleSubmit}>Login</Button>
      </FormLayout>
    </>
  )
}
