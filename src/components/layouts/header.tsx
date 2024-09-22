import store from '@/utils/storage'
import React, { useEffect, useState } from 'react'

const Header = () => {
  const [username, setUsername] = useState('')
  useEffect(() => {
    store.getStorageItem('user').then((val) => {
      setUsername(val.name)
    })
  }, [])
  return (
    <div className="w-full flex justify-between items-center px-10 py-3 border border-solid">
      <div className="header-logo">
        <p className="text-3xl">Simbrella</p>
      </div>
      <div className="header-nav w-50 flex justify-between items-center">
        <p className="text-lg">Hello, {username}</p>
      </div>
    </div>
  )
}

export default Header
