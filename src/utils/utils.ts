import { AxiosResponse } from 'axios'

export const handleResponse = async (request: AxiosResponse) => {
  // since all the API returns data
  const response = await request.data
  return response
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const staticPropsPayload = async <T>(name: string, fetch: (payload: T) => Promise<any>, payload: T) => {
  try {
    const data = await fetch(payload);
    return {
      props: {
        data,
      },
    }
  } catch (error) {
    return {
      props: {
        data: null
      },
    }
  }
}
