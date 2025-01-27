import { Header } from '@/components/layout/Header'
import { UserAlreadyExists } from '@/styles/pages/register'
import * as yup from 'yup'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterUserProps } from '@/types/user'
import { Input } from '@/components/form/Input'
import { useState } from 'react'
import { Button } from '@/components/form/Button'
import clientAPI from '@/services/client-api'
// import Cookies from 'js-cookie'

import { useToast } from '@/hooks/useToast'
import { useDispatch } from 'react-redux'

import { useRouter } from 'next/router'
import { setToken } from '@/storage/modules/user-token/action'

import { Container, Grid } from '@/styles/pages/sign-in'
// import { getCookieParser } from 'next/dist/server/api-utils'

const required = 'Este campo é obrigatório'

const schema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required(required),
  password: yup.string().min(6, required),
})

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserProps>({
    resolver: yupResolver(schema),
  })

  const [isLoading, setIsLoading] = useState(false)

  const { showToast } = useToast()
  const dispatch = useDispatch()
  const router = useRouter()

  async function handleAuthenticateUser(data: RegisterUserProps) {
    setIsLoading(true)

    const authUser = {
      email: data.email,
      password: data.password,
    }

    await clientAPI
      .post('/sessions', authUser, {
        withCredentials: true,
      })
      .then((result) => {
        const { token } = result.data

        dispatch(setToken(token))
        router.push('/profile')
      })
      .catch((e) => {
        showToast('Credenciais inválidas', {
          type: 'error',
          theme: 'colored',
        })
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      <Head>
        <title>{`Entrar | D'Coffee Shop`}</title>
      </Head>
      <Header />
      <Container>
        <form
          onSubmit={handleSubmit(handleAuthenticateUser)}
          style={{ gap: '1rem', display: 'flex', flexDirection: 'column' }}
        >
          <p className="text-xl font-bold">Entrar</p>

          <Grid>
            <Input
              label="E-mail"
              name="email"
              register={register}
              error={errors.email}
            />
            <Input
              label="Senha"
              name="password"
              register={register}
              error={errors.password}
              isPassword
            />
          </Grid>

          <Button variant="primary" type="submit" isLoading={isLoading}>
            Entrar
          </Button>
        </form>

        <UserAlreadyExists href={'/register'}>
          Não possui conta?
        </UserAlreadyExists>
      </Container>
    </>
  )
}
