import { HTMLAttributes } from 'react'

interface FormFieldInterface extends HTMLAttributes<HTMLDivElement> {
  label: string
}
const FormField = (props: FormFieldInterface) => {
  const { label, className, children } = props
  return (
    <div className={className}>
      <p className='text-m'>{label}</p>
      {children}
    </div>
  )
}

export default FormField
