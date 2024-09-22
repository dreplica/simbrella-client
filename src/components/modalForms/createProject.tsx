import { Form, FormButton, FormField, FormInput } from '@/components/forms'
import React, { useState } from 'react'
// import { validateRegistrationData } from './validateInputs'
import { useRouter } from 'next/router'

const CreateProject = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {


    try {
      // submit
      // CreateProjectRequest(value);
      setError('')
    } catch (error) {
      // set gloalError context
    }
  }

  return (
    <div className="w-96 h-96 relative bg-white px-6 pt-5 pb-8 shadow-xl ring-5 ring-gray-800/5 rounded-3xl">
      <p className="text-2xl font-bold mb-5">Create Project</p>
      {error && (
        <p className="mt-6 text-red-600 w-full text-center text-xs">{error}</p>
      )}
      <Form className="form w-full h-60 flex flex-col justify-between items-center">
        <FormField label="Title" className="w-full">
          <FormInput
            name="title"
            className="w-full h-12 px-3 outline-0 border-solid border-2 rounded-lg"
            onChange={(value) => setTitle(value as string)}
            required
          />
        </FormField>
        <FormField label="Description" className="w-full">
          <FormInput
            name="description"
            className="w-full h-12 px-3 outline-0 border-solid border-2 rounded-lg"
            multiline
            onChange={(value) => setDescription(value as string)}
            required
          />
        </FormField>
        <FormButton
          className="block w-1/2 bg-black text-white rounded-3xl p-2"
          title="Create"
          onSubmit={handleSubmit}
        />
      </Form>
    </div>
  )
}

export default CreateProject
