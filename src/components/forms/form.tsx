import { HtmlHTMLAttributes } from 'react'

interface FormType extends HtmlHTMLAttributes<HTMLDivElement> {
  children: JSX.Element[]
}

const Form = ({ children, className }: FormType) => {
  return <div className={className}>{children}</div>
}

export default Form
