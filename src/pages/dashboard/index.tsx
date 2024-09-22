'use client'
import React, { useCallback, useEffect, useState } from 'react'

import { ProjectInterface } from '@/@types/apiRespons'
import ProjectCard from '@/components/cards/projectCard'
import { FormButton } from '@/components/forms'
import SharedCreate from '@/components/modalForms/sharedCreate'
import Modal from '@/components/modals/modal'
import { createProject, getAllProject } from '@/request/apiLayer'
import useRequest from '@/hooks/useRequest'
import AuthContextProvider from '@/components/authContext'
import DashboardLayout from '@/components/layouts/dashboardLayout'

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projects, setProject] = useState<ProjectInterface[]>([])
  const { loading, handleRequest } = useRequest<ProjectInterface[]>({
    request: getAllProject,
  })
  const {
    loading: loadingNewProject,
    error: newProjectError,
    handleRequest: fetchNewProject,
  } = useRequest<ProjectInterface>({
    request: createProject,
  })

  const fetchAllMyProjects = async () => {
    const data = await handleRequest()
    if (data?.length) setProject(data)
  }

  const onCreateProjects = async (values: {title: string, description: string}) => {
    const data = await fetchNewProject(values)
    if (data) setProject([...projects, data])
      setIsModalOpen(false)
  }

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_BASE_URL)
    fetchAllMyProjects()
  }, [])

  if (loading) {
    return <p>Loading</p>
  }

  return (
    <AuthContextProvider>
      <div className="w-full">
        <div className="w-full p-2 pr-10 flex justify-end">
          <FormButton
            className="block bg-black text-white rounded-3xl w-max py-2 px-4 mt-3 relative right-0"
            title="Create project"
            onSubmit={() => setIsModalOpen(true)}
          />
        </div>
        <div className="w-full flex justify-start flex-wrap">
          {projects?.map(({ tasks, title, _id }) => (
            <ProjectCard key={_id} id={_id} tasks={tasks} title={title} />
          ))}
        </div>
      </div>
      <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
        <SharedCreate
          header="Create Project"
          onSubmit={onCreateProjects}
          loading={loadingNewProject}
          error={newProjectError}
        />
      </Modal>
    </AuthContextProvider>
  )
}

Dashboard.Layout = DashboardLayout;

export default Dashboard
