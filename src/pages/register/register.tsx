import { Form, FormButton, FormField, FormInput } from '@/components/forms'
import React, { useEffect, useState } from 'react'
import { validateRegistrationData } from './validateInputs'
import { useRouter } from 'next/router'
import useRequest from '@/hooks/useRequest'
import { registerAdmin } from '@/request/apiLayer'

const RegisterAdmin = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const router = useRouter()

  const { loading, error, data, handleRequest, updateError } = useRequest({
    request: registerAdmin,
    validate: validateRegistrationData,
  })

  const onChangeEmail = (value: string) => {
    setEmail(value)
    updateError('')
  }

  const onChangeName = (value: string) => {
    setName(value)
    updateError('')
  }

  useEffect(() => {
    if (data) {
      router.push('/login')
    }
  }, [data])

  const handleSubmit = async () => {
    await handleRequest({ email, name })
  }

  return (
    <div className="Register-wrapper w-96 h-96 relative bg-white px-6 pt-14 pb-8 shadow-xl ring-5 ring-gray-800/5 rounded-3xl">
      <p className="text-2xl font-bold">Register Account</p>
      <p className="mt-6 text-red-600 w-full text-center h-2 text-xs">
        {error}
      </p>
      <Form className="form w-full h-60 flex flex-col justify-between items-center">
        <FormField label="Email" className="w-full">
          <FormInput
            name="email"
            value={email}
            className="w-full h-12 px-3 outline-0 border-solid border-2 rounded-lg"
            onChange={onChangeEmail}
            required
          />
        </FormField>
        <FormField label="name" className="w-full">
          <FormInput
            name="name"
            value={name}
            className="w-full h-12 px-3 outline-0 border-solid border-2 rounded-lg"
            onChange={onChangeName}
            required
          />
        </FormField>
        <FormButton
          className={`block w-1/2 bg-black text-white rounded-3xl p-2 
          !loading || 'bg-gray-600'
        }`}
          title={loading ? 'Loading...' : 'Login'}
          disabled={loading}
          onSubmit={handleSubmit}
        />
      </Form>
    </div>
  )
}

export default RegisterAdmin
