
import Parr from '../my/Parr'

function Separator({ text='separator', className = '' }) {
  return (
    <div
      className={`flex items-center h-3  justify-center gap-my_gap_1  ${className}`}
    >
      <span
        className={`flex-1  h-0.5 w-full block bg-progress_bar rounded-sm `}
      ></span>
      <Parr className='flex text-ph_color_1'>{text}</Parr>
      <span className='flex-1 h-0.5 w-full block bg-progress_bar rounded-sm'></span>
    </div>
  )
}

export default Separator
