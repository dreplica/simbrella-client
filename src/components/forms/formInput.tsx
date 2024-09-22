import { ChangeEvent, InputHTMLAttributes } from 'react'

type FormInputInterface = Omit<
  InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
  'onChange'
> & {
  onChange(val: string): void
  multiline?: boolean // New prop to toggle between input and textarea
}

const FormInput = (props: FormInputInterface) => {
  const {
    name,
    onChange,
    className,
    value,
    required,
    placeholder,
    multiline = false,
    ...rest
  } = props

  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = event.currentTarget.value
    onChange(value)
  }

  return multiline ? (
    <textarea
      className={className}
      placeholder={placeholder}
      name={name}
      onChange={handleOnChange}
      value={value}
      required={required}
      rows={8}
      {...rest}
    />
  ) : (
    <input
      className={className}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={handleOnChange}
      required={required}
      {...rest}
    />
  )
}

export default FormInput
