
import Label1 from './Label1'

function Separator({ text='separator', className = '' }) {
  return (
    <div
      className={`flex  items-center h-3  justify-between gap-my_gap_1 w-full   ${className}`}
    >
      <span
        className={`flex-1  h-0.5 w-full block bg-border_input_color rounded-sm `}
      ></span>
      <Label1 className='flex  text-parr_color_1 font-light'>{text}</Label1>
      <span className='flex-1 h-0.5 w-full block bg-border_input_color rounded-sm'></span>
    </div>
  )
}

export default Separator
