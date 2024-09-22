import React, { HTMLAttributes } from 'react'

type TableInterface = {} & HTMLAttributes<HTMLTableElement>

const Table = ({ children, className }: TableInterface) => {
  return <table className={className}>{children}</table>
}

export default Table
