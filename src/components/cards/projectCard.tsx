import React from 'react'
import { FormButton } from '../forms'
import { TaskInterface } from '@/@types/apiRespons'
import { useRouter } from 'next/router'

interface ProjectCardInterface {
  id?: string
  title?: string
  tasks?: TaskInterface[]
}
const ProjectCard = ({ title, tasks, id }: ProjectCardInterface) => {
  const router = useRouter()
  console.log({title, id})
  const handleViewProject = () => {
    router.push(`/dashboard/project/${id}`)
  }

  return (
    <div className="mx-5 p-5 w-max">
      <p className="text-xl bold mb-2">{title}</p>
      <div className="w-full border p-5 shadow-xl rounded-3xl ">
        <div className="w-80 ">
          <p className="text-l bold mb-2">Tasks</p>
          {tasks?.map((task, index) => (
            <div
              key={`${task.title}-${index}`}
              className="w-full max-h-40 flex justify-between"
            >
              <p className="max-w-40 truncate">{task.title}</p>
              <p>Status: {task.status}</p>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-end mt-2">
          <FormButton
            className="block bg-black text-white rounded-3xl w-max py-1 px-4 my-2 relative right-0"
            title="View Project"
            onSubmit={handleViewProject}
          />
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
