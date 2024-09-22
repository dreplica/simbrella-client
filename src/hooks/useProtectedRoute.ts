import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

import { AuthContext } from '@/components/authContext'

const useProtectedRoute = () => {
  const router = useRouter()
  const authContext = useContext(AuthContext)

  useEffect(() => {
    if (!authContext?.loadingAuthUser && !authContext?.isAuthUser) {
      router.push('/login')
    }
  }, [authContext?.isAuthUser, authContext?.loadingAuthUser, router])
}

export default useProtectedRoute