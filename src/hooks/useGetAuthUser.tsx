import { useCallback, useEffect, useState } from 'react'

import store from '@/utils/storage'
import { useRouter } from 'next/router'

const useGetAuthUser = () => {
  const [isAuthUser, setIsAuthUser] = useState(true)
  const [loadingAuthUser, setLoadingAuthUser] = useState(false)

  const getUserAccess = async () => {
    setLoadingAuthUser(true)
    const user = (await store.getStorageItem('user')) as { token: string }
    if (!user.token) {
      setIsAuthUser(false)
      setLoadingAuthUser(false)
      return
    }
    setIsAuthUser(true)
    setLoadingAuthUser(false)
  }

  const updateUserAuth = (value: boolean) => {
    setIsAuthUser(value)
  }

  useEffect(() => {
    getUserAccess()
  }, [])

  return {
    isAuthUser,
    loadingAuthUser,
    updateUserAuth,
  }
}

export default useGetAuthUser
