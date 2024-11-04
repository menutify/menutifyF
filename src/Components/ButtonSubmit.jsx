import React from 'react'

function ButtonSubmit({isPending}) {
  return (
    <button
    disabled={isPending}
    style={!isPending ? {} : { color: '#4448', cursor: 'default' }}
  >
    Submit
  </button>
  )
}

export default ButtonSubmit