import React from 'react'

function Parr({ children = '', className = '' }) {
  return <p className={`text-sm ${className}`}>{children}</p>
}

export default Parr
