import React, { HTMLAttributes } from 'react'

type TableCellInterface = {} & HTMLAttributes<HTMLTableCellElement>

const TableCell = ({ children, className }: TableCellInterface) => {
  return <td className={className}>{children}</td>
}

export default TableCell
