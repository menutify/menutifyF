import React from 'react'
import Parr from './Parr'

function Separator({ text }) {
  return (
    <div className='flex items-center justify-center gap-3 mt-2 mb-2'>
      <span className='flex-1  h-0.5 w-full block bg-progress_bar rounded-sm'></span>
      <Parr className='flex text-ph_color_1'>{text}</Parr>
      <span className='flex-1 h-0.5 w-full block bg-progress_bar rounded-sm'></span>
    </div>
  )
}

export default Separator
