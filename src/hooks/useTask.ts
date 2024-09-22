import { Realtime, TaskInterface } from '@/@types/apiRespons'
import React, { useEffect, useState } from 'react'
import useWebSocket from './useWebsocket'
import { useRouter } from 'next/router'
import useRequest from './useRequest'
import { getTask } from '@/request/apiLayer'
import store from '@/utils/storage'

const useTask = (id: string) => {
  const [task, setTask] = useState<TaskInterface>()
  const [openModal, setOpenModal] = useState(false)
  const [comment, setComment] = useState('')

  const { messages, sendMessage } = useWebSocket('ws://localhost:3006')
  const router = useRouter()

  const { handleRequest: getTaskRequest } = useRequest<TaskInterface>({
    request: getTask,
  })

  const updateCurrentTask = async (values: object) => {
    sendMessage(
      JSON.stringify({
        operation: 'update',
        type: 'task',
        payload: {
          id,
          ...values,
        },
      }),
    )
  }

  const deleteCurrentTask = async () => {
    sendMessage(
      JSON.stringify({ type: 'task', operation: 'delete', payload: { id } }),
    )
  }

  const sendEmails = async () => {
    sendMessage(
      JSON.stringify({ type: 'task', operation: 'success', payload: { id } }),
    )
  }

  const addComment = async () => {
    const { _id: userId } = (await store.getStorageItem('user')) as {
      _id: string
    }
    sendMessage(
      JSON.stringify({
        operation: 'comment',
        type: 'task',
        payload: {
          id,
          userId,
          message: comment,
        },
      }),
    )
  }

  const getTaskDetails = async () => {
    const data = await getTaskRequest(id)
    if (data?._id) {
      console.log(data?.status)
      setTask(data)
    }
  }

  useEffect(() => {
    getTaskDetails()
  }, [])

  useEffect(() => {
    if (messages) {
      console.log({ messages })
      const result = messages as unknown as Realtime
      const { type, operation, response } = result
      if (type === 'task') {
        setTask(response)
        if (operation === 'update') {
          setOpenModal(false)
          sendEmails();
        }
        if (operation === 'update') {
          setComment('')
          sendEmails()
        }
        if (operation === 'delete') {
          sendEmails()
          router.back()
        }
      }
    }
  }, [messages])
  return {
    task,
    openModal,
    comment,
    setOpenModal,
    deleteCurrentTask,
    setComment,
    addComment,
    updateCurrentTask,
  }
}

export default useTask
