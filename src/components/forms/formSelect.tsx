import React from 'react'

type SelectType = { title: string; id: string }
interface FormSelectProps {
  label?: string
  value: number | string
  options: SelectType[]
  onChange: (value: number) => void
  required?: boolean
}

const FormSelect: React.FC<FormSelectProps> = ({
  label = 'Role',
  options,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="w-full mb-4">
      <label className="block mb-1">{label}</label>
      <select
        className="w-full h-12 px-3 outline-0 border-solid border-2 rounded-lg"
        value={value}
        onChange={(e) => {
          const index = parseInt(e.target?.value)
          onChange(index)
        }}
        required={required}
      >
        {options.map((option, index) => (
          <option key={option.title} value={index} data-item={option.id}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FormSelect
