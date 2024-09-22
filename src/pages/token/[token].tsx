'use client'
import { emailRedirect } from '@/request/apiLayer'
import store from '@/utils/storage'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'

type PayloadType = { data: {name: string; token: string; role: string; _id: string } }
type ServerProps = { params: { token: string } }

export const getServerSideProps = async ({ params }: ServerProps) => {
  const emptyData = { props: { data: null } }
  if (!params.token) return emptyData
  const response = await emailRedirect(params.token)
  if (!response.success) return emptyData
  return {
    props: { data: response },
  }
}

const TokenLogin = ({ data }: { data: PayloadType }) => {
  const router = useRouter()

  const saveDetails = useMemo(() => {
    if (data) {
      data.data.token = `${data.data.token}`
      const result = store.setStorageItem('user', data.data)
      return result;
    }
    return false;
  }, [data])

  useEffect(() => {
    if(saveDetails) {
      router.replace('/dashboard')
    }
  }, [saveDetails, router])

  return <div>Loading...</div>
}

export default TokenLogin
