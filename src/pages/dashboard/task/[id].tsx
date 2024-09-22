import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { CommentTypes, Realtime, TaskInterface } from '@/@types/apiRespons'
import Comment from '@/components/comment/comments'
import { FormButton, FormInput } from '@/components/forms'
import FormSelect from '@/components/forms/formSelect'
import SharedCreate from '@/components/modalForms/sharedCreate'
import Modal from '@/components/modals/modal'
import useRequest from '@/hooks/useRequest'
import useWebSocket from '@/hooks/useWebsocket'
import { getTask } from '@/request/apiLayer'
import store from '@/utils/storage'
import useTask from '@/hooks/useTask'
import DashboardLayout from '@/components/layouts/dashboardLayout'

export const getServerSideProps = ({ params }) => {
  return {
    props: {
      data: params.id,
    },
  }
}

const TaskView = ({ data: id }) => {
  const {
    task,
    openModal,
    comment,
    setComment,
    setOpenModal,
    updateCurrentTask,
    deleteCurrentTask,
    addComment,
  } = useTask(id)

  if (!id) {
    return <p>task doesnt exist</p>
  }

  return (
    <>
      <div className="w-full">
        <div className="flex items-start justify-between py-5">
          <div className="max-w-80">
            <p>Title: {task?.title as string}</p>
            <p>Description: {task?.description as string}</p>
          </div>
          <div className="flex flex-col items-end">
            <FormButton
              className="block bg-black text-white rounded-3xl w-max py-2 px-4 relative right-0"
              title="Edit Task"
              onSubmit={() => {
                setOpenModal(true)
              }}
            />
            <FormButton
              className="block bg-black text-white rounded-3xl w-max py-2 px-4 mt-3 relative right-0"
              title="Delete Task"
              onSubmit={deleteCurrentTask}
            />
          </div>
        </div>
        <div className="w-full flex flex-col max-w-xl">
          <FormInput
            multiline
            name="Comment"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out resize-none"
            value={comment}
            placeholder={'comment'}
            onChange={(val) => setComment(val)}
            required={false}
          />
          <FormButton
            className="block bg-black text-white rounded-3xl w-max py-2 px-4 mt-3 relative right-0"
            title="Add Comment"
            onSubmit={addComment}
          />
        </div>
        {/* comment views */}
        <div className="max-w-xl mt-20">
          <p className="text-2xl mb-3 font-black">Comments</p>
          {task?.comments?.reverse().map(({ user, message }) => (
            <Comment key={user._id} name={user.name} comment={message} />
          ))}
        </div>
      </div>
      <Modal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false)
        }}
      >
        <SharedCreate header={'Edit task'} onSubmit={updateCurrentTask} />
      </Modal>
    </>
  )
}

TaskView.Layout = DashboardLayout
export default TaskView
