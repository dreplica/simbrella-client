import Link from 'next/link'
import React from 'react'

const SideNav = () => {
  return (
    <div className="w-60 h-full border-r-2">
      <nav className="h-full flex fixed flex-col pl-10 pt-10">
        <Link href={'/dashboard'} className={`w-max mb-8 w-max text-xl`}>
          projects
        </Link>
        <Link href={'/dashboard/users'} className={`w-max mb-8 w-max text-xl`}>
          users
        </Link>
      </nav>
    </div>
  )
}

export default SideNav
