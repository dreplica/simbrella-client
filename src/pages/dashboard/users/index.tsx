import { UserInterface } from '@/@types/apiRespons'
import { FormButton } from '@/components/forms'
import DashboardLayout from '@/components/layouts/dashboardLayout'
import AddMember from '@/components/modalForms/addMember'
import Modal from '@/components/modals/modal'
import MembersTable from '@/components/projectsTable/membersTable'
import useRequest from '@/hooks/useRequest'
import { createUser, deleteUser, getAllUser } from '@/request/apiLayer'
import React, { useEffect, useState } from 'react'

const Users = () => {
  const [users, setUsers] = useState<UserInterface[]>([])
  const [openModal, setOpenModal] = useState(false)

  const { loading, handleRequest: fetchAllUsers } = useRequest<UserInterface[]>(
    { request: getAllUser },
  )
  const { handleRequest: deleteUserRequest } = useRequest<UserInterface>({
    request: deleteUser,
  })

  const { handleRequest: addUserRequest, error: addUserError } = useRequest<
    UserInterface
  >({
    request: createUser,
  })

  const removeUser = async (memberId: string) => {
    const data = await deleteUserRequest(memberId)
    if (data?._id) {
      const newUsers = users.filter(val => val._id !== data._id)
      setUsers(newUsers)
    }
  }

  const addUser = async (values: unknown) => {
    const data = await addUserRequest(values)
    if (data?._id) {
      const newUsers = [...users, data] as UserInterface[]
      setUsers(newUsers)
      setOpenModal(false)
    }
  }

  useEffect(() => {
    fetchAllUsers().then((res) => setUsers(res as UserInterface[]))
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  console.log({ users })

  return (
    <>
      <div>
        <div className="w-full p-2 pr-10 flex justify-end">
          <FormButton
            className="block bg-black text-white rounded-3xl w-max py-2 px-4 mt-3 relative right-0"
            title="Add user"
            onSubmit={() => setOpenModal(true)}
          />
        </div>
        <MembersTable
          headers={['Name', 'Role', 'Active', 'Action']}
          content={users!}
          onAction={removeUser}
        />
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <AddMember onSubmit={addUser} error={addUserError} />
      </Modal>
    </>
  )
}

Users.Layout = DashboardLayout;
export default Users
