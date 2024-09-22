import React, { HTMLAttributes } from 'react'

type TableHeadInterface = {} & HTMLAttributes<HTMLTableSectionElement>

const TableHead = ({ children, className }: TableHeadInterface) => {
  return <thead className={className}>{children}</thead>
}

export default TableHead
