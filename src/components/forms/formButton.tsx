import { ButtonHTMLAttributes, MouseEvent } from 'react'

interface FormButtonInterface extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  onSubmit(): void
}

const FormButton = (props: FormButtonInterface) => {
  const { title, className, onSubmit, disabled, ...rest } = props

  const handleButtonClick = (e: MouseEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <button
      {...rest}
      disabled={disabled}
      className={className}
      onClick={handleButtonClick}
    >
      {title}
    </button>
  )
}

export default FormButton
