import { Form, FormButton, FormField, FormInput } from '@/components/forms'
import React, { useState } from 'react'
import FormSelect from '../forms/formSelect'
import { CustomFields } from '@/@types/apiRespons'

const roleItem = [
  { title: 'member', _id: 'member' },
  { title: 'manager', _id: 'member' },
  { title: 'admin', _id: 'member' },
]

const AddMember = ({ onSubmit, error }: CustomFields) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState(roleItem[0].title)

  const handleSubmit = () => {
    try {
      onSubmit?.({ name, email, role })
    } catch (error) {
      console.error(error)
    }
  }

  const onRoleSelect = (val: number) => {
    console.log({ val })
    setRole(roleItem[val].title)
  }

  return (
    <div className="w-96 h-96 relative bg-white px-6 pt-5 pb-8 shadow-xl ring-5 ring-gray-800/5 rounded-3xl">
      <p className="text-2xl font-bold mb-5">Add User</p>
      {error && (
        <p className="mt-6 text-red-600 w-full text-center text-xs">{error}</p>
      )}
      <Form className="form w-full h-60 flex flex-col justify-between items-center">
        <FormField label="Email" className="w-full">
          <FormInput
            name="email"
            value={email}
            className="w-full h-12 px-3 outline-0 border-solid border-2 rounded-lg"
            onChange={(value) => setEmail(value as string)}
            required
          />
        </FormField>
        <FormField label="name" className="w-full">
          <FormInput
            name="name"
            value={name}
            className="w-full h-12 px-3 outline-0 border-solid border-2 rounded-lg"
            onChange={(value) => setName(value as string)}
            required
          />
        </FormField>
        <FormSelect<any>
          onChange={(val) => onRoleSelect(val)}
          value={role}
          label="Role"
          options={roleItem}
        />
        <FormButton
          className="block w-1/2 bg-black text-white rounded-3xl p-2"
          title="Create"
          onSubmit={handleSubmit}
        />
      </Form>
    </div>
  )
}

export default AddMember
