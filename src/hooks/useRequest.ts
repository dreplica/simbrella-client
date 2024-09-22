import { useState } from 'react'
import Joi from 'joi'

interface APIResponseInterface {
  data?: unknown
  success?: string
  error?: unknown
  message?: string
}

interface UserRequestInterface {
  request(arg?: unknown): Promise<APIResponseInterface>
  values?: unknown
  validate?: (arg: unknown) => Joi.ValidationResult
}

const useRequest = <T>(props: UserRequestInterface) => {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleRequest = async (values?: unknown) => {
    if (props.validate) {
      const { error: errorData } = props.validate?.(values)
      if (errorData) {
        console.log('clicked', values, props.values, error, loading)
        setError(errorData.message)
        return
      }
    }

    try {
      setLoading(true)
      console.log('started')
      const response = await props.request(props?.values ?? values)
      if (response.success) {
        console.log({response})
        setData(response.data as T)
        setError('')
      }
      if (response.error) {
        console.log({error})
        setError(response.message as string)
      }
      return response.data as T
    } catch (errResponse) {
      console.log({errResponse})
      setError((errResponse as Record<string, any>).response.data.error)
      console.log({errResponse})
    } finally {
      setLoading(false)
    }
  }
  return {
    error,
    updateError: setError,
    loading,
    data,
    handleRequest,
  }
}

export default useRequest
