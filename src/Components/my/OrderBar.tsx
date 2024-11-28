import React from 'react'

function OrderBar({
  state = 0,
}: {
  state: 0 | 1 | 2
}) {
  const options = {
    0: [true, false, false],
    1: [false, true, false],
    2: [false, false, true]
  }

  return (
    <div className='h-1.5 w-12 relative flex '>
      <span
        className={`h-full w-3 ${
          options[state][1] ? 'bg-primary_color' : 'bg-white'
        } rounded-md before:block before:absolute before:h-full before:rounded-md ${
          options[state][0]
            ? 'before:bg-primary_color'
            : 'before:bg-white'
        }  before:-left-0 before:right-0 m-auto 
          before:w-3
         after:block after:absolute after:h-full  after:rounded-md ${
           options[state][2]
             ? 'after:bg-primary_color'
             : 'after:bg-white'
         } after:-right-0 after:w-3`}
      />
    </div>
  )
}

export default OrderBar
