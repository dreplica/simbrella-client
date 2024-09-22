import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
} from 'react'
import Header from './header'
import SideNav from '../sideNav'
import { AuthContext } from '../authContext'
import { useRouter } from 'next/router'

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const authContext = useContext(AuthContext)
  const router = useRouter()

  // const protectRoute = useCallback(() => {
  //   if (!authContext?.loadingAuthUser && !authContext?.isAuthUser) {
  //     router.push('/login')
  //   }
  // }, [authContext?.isAuthUser, authContext?.loadingAuthUser])

  // useEffect(() => {
  //   protectRoute()
  // }, [protectRoute])

  return (
    <div className="w-screen h-screen fixed flex flex-col justify-start">
      <Header />
      <div className="w-full flex flex-1 max-w-full overflow-scroll">
        <SideNav />
        <div className="flex-1 h-full overflow-scroll px-12 pb-24">{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout
