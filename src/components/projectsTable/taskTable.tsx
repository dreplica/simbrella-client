import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '../tables'
import { TaskInterface } from '@/@types/apiRespons'
import { FormButton } from '../forms'
import { useRouter } from 'next/router'

interface TaskTableInterface {
  headers: ('title' | 'status' | 'Created at' | 'Assigned')[]
  content: TaskInterface[]
}

const TaskTable = ({ headers, content }: TaskTableInterface) => {
  const router = useRouter()
  return (
    <div className="w-full">
      <Table className="w-full max-w-2xl border-collapse text-left">
        <TableHead className="border-b-2">
          <TableRow>
            {headers.map((header) => (
              <TableHeadCell
                className="py-3 px-4 border-b-2 border-gray-200"
                key={header}
              >
                {header}
              </TableHeadCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {content.map(({ title, createdAt, assignedTo, status, _id }) => (
            <TableRow key={_id} className="hover:bg-gray-100">
              <TableCell className="py-3 px-4 border-b border-gray-100">
                {title}
              </TableCell>
              <TableCell className="py-3 px-4 border-b border-gray-100">
                {status}
              </TableCell>
              <TableCell className="py-3 px-4 border-b border-gray-100">
                {new Date(createdAt)?.toDateString()}
              </TableCell>
              <TableCell className="py-3 px-4 border-b border-gray-100">
                {assignedTo ? 'yes' : 'no'}
              </TableCell>
              <TableCell className="py-3 px-4 border-b border-gray-100">
                <FormButton
                  title="View"
                  onSubmit={() => {
                    router.push(`/dashboard/task/${_id}`)
                  }}
                  className="block bg-black text-white rounded-3xl w-max py-2 px-4 mt-3 relative right-0"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TaskTable
