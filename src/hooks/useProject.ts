import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useRequest from './useRequest'
import { ProjectInterface, ROLES, TaskInterface, UserInterface } from '@/@types/apiRespons'
import { createTask, deleteProject, getAllUser, getProject, removeMemberToProject, updateProject } from '@/request/apiLayer'
import { error } from 'console'

const useProject = (id: string) => {
  const [project, setProject] = useState<ProjectInterface>()
  const [users, setUsers] = useState<{
    title: string
    role: ROLES
    _id: string
  }>()

  const [openTaskModal, setOpenTaskModal] = useState(false)
  const [openUserModal, setOpenUserModal] = useState(false)
  const [openProjectModal, setOpenProjectModal] = useState(false)
  const router = useRouter()
  const { loading, handleRequest: fetchProjectRequest } =
    useRequest<ProjectInterface>({
      request: getProject,
      values: id,
    })

  const { handleRequest: requestEdit } = useRequest<ProjectInterface>({
    request: updateProject,
  })

  const { handleRequest: deleteProjectRequest } = useRequest<ProjectInterface>({
    request: deleteProject,
  })

  const { error: taskError, handleRequest: createTaskRequest } =
    useRequest<TaskInterface>({
      request: createTask,
    })

  const {
    loading: loadingUsers,
    error: userError,
    handleRequest: getAllUserRequest,
  } = useRequest<UserInterface[]>({
    request: getAllUser,
  })

  const { handleRequest: removeMemberRequest } =
    useRequest<ProjectInterface>({
      request: removeMemberToProject,
    })

  const removeUser = async (memberId: string) => {
    const data = await removeMemberRequest({ id, memberId })
    if (data?._id) {
      setProject(data)
    }
  }

  const fetchUsers = async () => {
    const data = await getAllUserRequest()
    const newData = data?.map(({ _id, name, role }) => ({
      _id,
      title: name,
      role,
    }))
    setUsers(newData)
  }

  const fetchProject = async () => {
    const data = await fetchProjectRequest(id)
    setProject(data)
  }

  const editProject = async (values: object) => {
    const data = await requestEdit({...values, id})
    if (data?._id) {
      setProject(data)
      setOpenProjectModal(false)
    }
  }

  const removeProject = async () => {
    const data = await deleteProjectRequest(id)
    router.push('/dashboard')
    setProject(data)
  }

  const newTask = async (values: { title: string; description: string }) => {
    const data = await createTaskRequest({ projectId: id, ...values })
    if (data) {
      const newProjectTask = project
      newProjectTask?.tasks?.push(data)
      setProject(newProjectTask)
      setOpenTaskModal(false)
    }
  }

  useEffect(() => {
    fetchProject()
    fetchUsers()
  }, [id])

  return {
    newTask,
    removeMemberToProject,
    editProject,
    removeProject,
    fetchProject,
    fetchUsers,
    removeUser,
    setOpenUserModal,
    setOpenProjectModal,
    setOpenTaskModal,
    loading,
    loadingUsers,
    openProjectModal,
    openTaskModal,
    openUserModal,
    taskError,
    userError,
    project,
    users,
  }
}

export default useProject