import apiClient from './api'
import { handleResponse } from '@/utils/utils'

export const login = async ({ email }: { email: string }) => {
  return handleResponse(await apiClient.post('/auth/login', { email }))
}

export const registerAdmin = async ({
  email,
  name,
}: {
  email: string
  name: string
}) => {
  return handleResponse(await apiClient.post('/auth/register', { email, name }))
}

export const emailRedirect = async (token: string) => {
  // todo: send user data
  return handleResponse(await apiClient.get(`/auth/login/${token}`))
}

// projects
export const getAllProject = async () => {
  return handleResponse(await apiClient.get(`/project`))
}

export const getProject = async (projectId: string) => {
  return handleResponse(await apiClient.get(`/project/${projectId}`))
}

export const createProject = async (data: {
  title: string
  description: string
}) => {
  return handleResponse(await apiClient.post(`/project/create`, data))
}

export const updateProject = async (data: object) => {
  return handleResponse(await apiClient.put(`/project/update`, data))
}

export const addMemberToProject = async (data: {
  userId: string
  id: string
}) => {
  return handleResponse(await apiClient.put(`/project/add/member`, data))
}

export const removeMemberToProject = async (data: {
  memberId: string
  id: string
}) => {
  return handleResponse(await apiClient.put(`/project/remove/member`, data))
}

export const deleteProject = async (id: string) => {
  return handleResponse(await apiClient.delete(`/project/${id}`))
}

// task
export const getAllTaskInProject = async (projectId: string) => {
  return handleResponse(await apiClient.get(`/task/project/${projectId}`))
}

export const getTask = async (TaskId: string) => {
  return handleResponse(await apiClient.get(`/task/${TaskId}`))
}

export const createTask = async (data: {
  projectId: string
  title: string
  description: string
}) => {
  return handleResponse(await apiClient.post(`/task/create`, data))
}

export const updateTask = async (data: {
  title: string
  description: string
  status: string
  id: string
}) => {
  return handleResponse(await apiClient.put(`/task`, data))
}

export const addMemberToTask = async (data: { userId: string; id: string }) => {
  return handleResponse(await apiClient.put(`/task/add/member`, data))
}

export const removeMemberToTask = async (data: {
  userId: string
  id: string
}) => {
  return handleResponse(await apiClient.put(`/task/remove/member`, data))
}

export const deleteTask = async (id: string) => {
  return handleResponse(await apiClient.delete(`/task/${id}`))
}

export const addCommentToTask = async (comment: {
  id: string
  message: string
}) => {
  return handleResponse(await apiClient.post(`/task/comment`, comment))
}

export const getCommentOnTask = async (id: string) => {
  return handleResponse(await apiClient.get(`/comment/${id}`))
}

// users
export const getUser = async (id: string) => {
  return handleResponse(await apiClient.get(`/user/${id}`))
}

export const getAllUser = async () => {
  return handleResponse(await apiClient.get(`/user`))
}

export const deleteUser = async (userId: string) => {
  return handleResponse(await apiClient.delete(`/user/${userId}`))
}

export const createUser = async ({
  email,
  name,
  role,
}: {
  email: string
  name: string
  role: string
}) => {
  return handleResponse(
    await apiClient.post('/user/create', { email, name, role }),
  )
}
