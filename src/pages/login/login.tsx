'use client'
import { useState } from 'react'
import { useRouter } from 'next/router'

import { Form, FormButton, FormField, FormInput } from '@/components/forms'
import { validateLoginData } from '../register/validateInputs'
import { login } from '@/request/apiLayer'
import useRequest from '@/hooks/useRequest'

const Login = () => {
  const [email, setEmail] = useState('')
  const router = useRouter()

  const { loading, error, handleRequest, updateError } = useRequest({
    request: login,
    values: { email },
    validate: validateLoginData,
  })

  const onChangeEmail = (value: string) => {
    setEmail(value)
    updateError('')
  }

  const handleSubmit = async () => {
    await handleRequest({ email })
    router.push('/confirm')
  }

  return (
    <div className="w-96 h-max-content relative bg-white px-6 pt-14 pb-8 shadow-xl ring-5 ring-gray-800/5 rounded-3xl">
      <p className="text-2xl font-bold">Account Login</p>
      <p className="mt-6 text-red-600 w-full text-center h-2 text-xs">
        {error}
      </p>
      <Form className="form w-full h-60 flex flex-col justify-between items-center">
        <FormField label="Email" className="w-full ">
          <FormInput
            name="email"
            placeholder="email"
            value={email}
            className="w-full h-12 px-3 outline-0 border-solid border-2 rounded-lg"
            onChange={onChangeEmail}
            required
          />
        </FormField>
        <div className="flex flex-col items-center justify-between w-full h-full pt-6 ">
          <FormButton
            className={`block w-1/2 bg-black text-white rounded-3xl p-2 ${
              !loading || 'bg-gray-600'
            }`}
            title={loading ? 'Loading...' : 'Login'}
            disabled={loading}
            onSubmit={handleSubmit}
          />
          <p className="my-4 text-sm">Contact admin for access</p>
        </div>
      </Form>
    </div>
  )
}

export default Login
