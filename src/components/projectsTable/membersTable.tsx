import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '../tables'
import { FormButton } from '../forms'
import { UserInterface } from '@/@types/apiRespons'

interface MembersTableInterface {
  headers: ('Name' | 'Role' | 'Active' | 'Action')[]
  content: UserInterface[]
  onAction?: (val: string)  => void
}

const MembersTable = ({ headers, content, onAction }: MembersTableInterface) => {
  return (
    <div className="w-full">
      <Table className="w-full max-w-2xl border-collapse text-left">
        <TableHead className="border-b-2">
          <TableRow>
            {headers.map((header) => (
              <TableHeadCell
                key={header}
                className="py-3 px-4 border-b-2 border-gray-200"
              >
                {header}
              </TableHeadCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {content?.map(({ name, role, isDisabled, _id }) => (
            <TableRow key={0} className="hover:bg-gray-100">
              <TableCell className="py-3 px-4 border-b border-gray-100">
                {name}
              </TableCell>
              <TableCell className="py-3 px-4 border-b border-gray-100">
                {role}
              </TableCell>
              <TableCell className="py-3 px-4 border-b border-gray-100">
                {isDisabled ? 'No' : 'Yes'}
              </TableCell>
              <TableCell className="py-3 px-4 border-b border-gray-100">
                <FormButton
                  title='Remove'
                  onSubmit={() => onAction?.(_id)}
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

export default MembersTable
