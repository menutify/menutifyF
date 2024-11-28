import React from 'react'

function ProgressBar({ state = 1 }: { state: 1 | 2 | 3 }) {
  const options = {
    1: [true, false, false],
    2: [true, true, false],
    3: [true, true, true]
  }

  return (
    <div className='flex w-full  h-1 relative mt-3 mb-3'>
      <span
        className={`h-full w-1-3 ${
          options[state][1] ? 'bg-primary_color' : 'bg-border_input_color'
        } rounded-md before:block before:absolute before:h-full before:rounded-md ${
          options[state][0] ? 'before:bg-primary_color' : 'before:bg-border_input_color'
        }  before:left-0 before:right-0 m-auto before:w-1-3 after:block after:absolute after:h-full  after:rounded-md ${
          options[state][2] ? 'after:bg-primary_color' : 'after:bg-border_input_color'
        } after:right-0 after:w-1-3`}
      />
    </div>
  )
}

export default ProgressBar
