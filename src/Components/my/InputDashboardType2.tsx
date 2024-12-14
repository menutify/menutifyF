import ModalRestaurant from '@/Dashboard/restaurant/components/ModalRestaurant'
import { Card } from '../ui/card'
import Title3 from './Title3'
import penSVG from '@/assets/all/pen.svg'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import { useEffect, useState } from 'react'

function InputDashboardType2({
  logoInput,
  ph,
  title,
  className = '',
  name = 'x'
}) {
  const { restaurant } = useDataGlobalContext()
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(restaurant[name] || '')
  }, [restaurant[name]])

  return (
    <Card
      id='myinputcomponent'
      className={` flex flex-col md:min-w-[170px] md:gap-2 p-3 md:py-4 md:px-6 h-16 md:h-auto  min-w-10 ${className}`}
    >
      <div className='flex justify-between'>
        <Title3>{title}</Title3>
        <ModalRestaurant imgSVG={penSVG} name={name} />
      </div>
      <div className='flex gap-0.5 md:gap-2 h-full justify-center items-center'>
        <picture className='h-full w-6  '>
          <img src={logoInput} alt='' />
        </picture>
        <input
          name={name}
          className='bg-white h-4 text-xs md:text-xl md:h-full w-full placeholder:text-sb_bg focus:outline-none'
          type='text'
          placeholder={'Añade una descripción'}
          value={value}
          disabled
        />
      </div>
    </Card>
  )
}

export default InputDashboardType2
