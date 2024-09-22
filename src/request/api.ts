import Axios from 'axios'
import store from '@/utils/storage'

const apiClient = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

apiClient.interceptors.request.use(async (config) => {
  if (typeof window !== 'undefined') {
    const user = await store.getStorageItem('user')
    if (!user) return config
    config.headers['authorization'] = `bearer ${
      (user as { token: string }).token
    }`
  }
  return config
})

export default apiClient
