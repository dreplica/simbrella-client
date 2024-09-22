import { Form, FormButton } from '@/components/forms'
import React, { useState } from 'react'
import FormSelect from '../forms/formSelect'
import { CustomFields } from '@/@types/apiRespons';

type SelectType = { id: string; [key: string]: string }

const AddTaskUser = ({
  onSubmit,
  header,
  error,
  items,
  loading,
}: CustomFields) => {

  const [user, setUser] = useState<number>(0)
  const onChange = (value: SelectType) => {
    try {
      setUser(value)
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
        <FormSelect
          onChange={onChange}
          value={user}
          label={loading ? 'loading...' : 'users'}
          options={items}
        />
        <FormButton
          className="block w-1/2 bg-black text-white rounded-3xl p-2"
          title="Add"
          onSubmit={() => onSubmit?.(items[user]._id)}
        />
      </Form>
    </div>
  )
}

export default AddTaskUser
