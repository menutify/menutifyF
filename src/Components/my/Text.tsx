import React from 'react'

function Text({ children = '', className = '' }) {
  return <p className={`text-base tracking-widest ${className}`}>{children}</p>
}

export default Text
