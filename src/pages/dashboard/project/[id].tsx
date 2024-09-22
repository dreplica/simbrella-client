import { UserInterface } from '@/@types/apiRespons'
import { FormButton } from '@/components/forms'
import DashboardLayout from '@/components/layouts/dashboardLayout'
import AddTaskUser from '@/components/modalForms/addTaskUser'
import SharedCreate from '@/components/modalForms/sharedCreate'
import Modal from '@/components/modals/modal'
import MembersTable from '@/components/projectsTable/membersTable'
import TaskTable from '@/components/projectsTable/taskTable'
import useProject from '@/hooks/useProject'
export const getServerSideProps = ({ params }) => {
  return {
    props: {
      data: params.id,
    },
  }
}

const ProjectView = ({ data: id }) => {
  const {
    newTask,
    editProject,
    removeProject,
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
  } = useProject(id)

  if (!id) {
    return <p>project doesnt exist</p>
  }

  if (loading || loadingUsers) {
    return <p>loading</p>
  }

  return (
    <>
      <div className="w-full">
        <div className="flex items-start justify-between py-5">
          <div className="max-w-80">
            <p className="text-2xl mb-3 font-black">
              Project title: {project?.title}
            </p>
            <p className="text-lg font-black">Project description: </p>
            <p>{project?.description}</p>
          </div>
          <div className="flex flex-col items-end">
            <FormButton
              className="block bg-black text-white rounded-3xl w-max py-2 px-4 relative right-0"
              title="Edit Project"
              onSubmit={() => {
                setOpenProjectModal(true)
              }}
            />
            <FormButton
              className="block bg-black text-white rounded-3xl w-max py-2 px-4 mt-3 relative right-0"
              title="Delete Project"
              onSubmit={removeProject}
            />
          </div>
        </div>
        <div className="flex justify-end items-center mt-24">
          <div>
            {/* show add task modal */}
            <FormButton
              className="block bg-black text-white rounded-3xl w-max py-2 px-4 mt-3 relative right-0"
              title="Add Project Task"
              onSubmit={() => setOpenTaskModal(true)}
            />
          </div>
        </div>
        <p className="text-xl ">
          Manager: {(project?.creator as UserInterface)?.name}
        </p>
        <p className="text-2xl font-black">Project Task</p>
        <TaskTable
          headers={['title', 'status', 'Created at', 'Assigned', '']}
          content={project?.tasks || []}
        />
        <div className="w-full mt-20  flex justify-end">
          <FormButton
            title="Add Project Member"
            onSubmit={() => setOpenUserModal(true)}
            className="block bg-black text-white rounded-3xl w-max py-2 px-4 relative right-0"
          />
        </div>
        <MembersTable
          headers={['Name', 'Role', 'Action']}
          content={project?.members}
          onAction={removeUser}
        />
      </div>
      <Modal
        isOpen={openProjectModal}
        onClose={() => setOpenProjectModal(false)}
      >
        {<SharedCreate header="Edit Project" onSubmit={editProject} />}
      </Modal>
      <Modal isOpen={openTaskModal} onClose={() => setOpenTaskModal(false)}>
        {
          <SharedCreate
            header="Add Task Project"
            error={taskError}
            onSubmit={newTask}
          />
        }
      </Modal>
      <Modal isOpen={openUserModal} onClose={() => setOpenUserModal(false)}>
        {
          <AddTaskUser
            header="Add project member"
            onSubmit={(id) => editProject({ memberId: id })}
            loading={loadingUsers}
            items={users}
            error={userError}
          />
        }
      </Modal>
    </>
  )
}

ProjectView.Layout = DashboardLayout
export default ProjectView
