import useGetAuthUser from '@/hooks/useGetAuthUser'
import { createContext, PropsWithChildren } from 'react'
import PageLoader from '../pageLoader'
import { useRouter } from 'next/router'

type AuthContextType = {
  isAuthUser: boolean
  loadingAuthUser: boolean
  updateUserAuth: (value: boolean) => void
} | null

export const AuthContext = createContext<AuthContextType>(null)

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const { loadingAuthUser, isAuthUser, updateUserAuth } = useGetAuthUser()
  const router = useRouter()



  if (loadingAuthUser) {
    return <PageLoader />
  }

  if (!isAuthUser) {
    router.push('/login')
  }

  return (
    <AuthContext.Provider
      value={{ isAuthUser, loadingAuthUser, updateUserAuth }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
