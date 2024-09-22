import React, { PropsWithChildren } from 'react'

const AuthLayout = ({ children }: PropsWithChildren) => {
  return <div className='w-full h-full relative flex items-center justify-center'> {children}</div>
}

export default AuthLayout
