import { Form, FormButton, FormField, FormInput } from '@/components/forms'
import React, { useState } from 'react'
// import { validateRegistrationData } from './validateInputs'

const SharedCreate = ({ onSubmit, header, loading, error }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async () => {
    try {
      await onSubmit({ title, description })
      setTitle('')
      setDescription('')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="w-96 h-96 relative bg-white px-6 pt-5 pb-8 shadow-xl ring-5 ring-gray-800/5 rounded-3xl">
      <p className="text-2xl font-bold mb-5">{header}</p>
      {error && (
        <p className="mt-6 text-red-600 w-full text-center text-xs">{error}</p>
      )}
      <Form className="form w-full h-60 flex flex-col justify-between items-center">
        <FormField label="Title" className="w-full">
          <FormInput
            name="title"
            className="w-full h-12 px-3 outline-0 border-solid border-2 rounded-lg"
            value={title}
            onChange={(value) => setTitle(value as string)}
            required
          />
        </FormField>
        <FormField label="Description" className="w-full">
          <FormInput
            name="description"
            className="w-full h-12 px-3 outline-0 border-solid border-2 rounded-lg"
            multiline
            value={description}
            onChange={(value) => setDescription(value as string)}
            required
          />
        </FormField>
        <FormButton
          className="block w-1/2 bg-black text-white rounded-3xl p-2"
          title={!!loading ? 'wait' : 'Create'}
          disabled={loading}
          onSubmit={handleSubmit}
        />
      </Form>
    </div>
  )
}

export default SharedCreate
