import React, { HTMLAttributes } from 'react'

type TableHeadCellInterface = {} & HTMLAttributes<HTMLTableSectionElement>

const TableHeadCell = ({ children, className }: TableHeadCellInterface) => {
  return <th className={className}>{children}</th>
}

export default TableHeadCell
