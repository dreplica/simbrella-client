import React, { HTMLAttributes } from 'react'

type TableBodyInterface = {} & HTMLAttributes<HTMLTableSectionElement>

const TableBody = ({ children, className }: TableBodyInterface) => {
  return <tbody className={className}>{children}</tbody>
}

export default TableBody
