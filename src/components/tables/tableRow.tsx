import React, { HTMLAttributes } from 'react'

type TableRowInterface = {} & HTMLAttributes<HTMLTableRowElement>

const TableRow = ({ children, className }: TableRowInterface) => {
  return <tr className={className}>{children}</tr>
}

export default TableRow
