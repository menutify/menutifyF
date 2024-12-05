
import { Card } from '../ui/card'

import penSVG from '@/assets/all/pen.svg'
import Title3 from './Title3'
function InputDashboard({ logoInput, ph, title, className = '' }) {
  return (
    <Card
      id='myinputcomponent'
      className={`flex flex-col md:gap-2 p-3 md:py-4 md:px-6 h-16 md:h-24 min-w-10 ${className}`}
    >
      <div className='flex justify-between'>
        <Title3>{title}</Title3>
        <picture className='h-full w-4 md:w-6 cursor-pointer '>
          <img  src={penSVG} alt='' />
        </picture>
      </div>
      <div className='flex gap-0.5 md:gap-2 justify-center items-center'>
        <picture className='h-full w-6  '>
          <img src={logoInput} alt='' />
        </picture>
        <input
          className='bg-white h-4 text-xs md:text-xl md:h-auto w-full placeholder:text-sb_bg focus:outline-none'
          type='text'
          placeholder={ph}
        />
      </div>
    </Card>
  )
}

export default InputDashboard
