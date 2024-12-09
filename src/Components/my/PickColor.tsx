import { useDataGlobalContext } from '@/Context/GlobalContext'
import React from 'react'

const colors = [
  '#FF5733', // Bright Orange
  '#33FF57', // Bright Green
  '#5733FF', // Bright Purple
  '#FF33A1', // Bright Pink
  '#33A1FF', // Bright Blue
  '#A1FF33', // Bright Lime
  '#FF3333', // Bright Red
  '#FFA133', // Bright Amber
  '#33FFF5' // Bright Cyan
]

function PickColor() {
  const { restaurant, setRestaurant } = useDataGlobalContext()

  const handleColorPicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRestaurant({ ...restaurant, s_color: e.target.value })
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    
    if (e.target.id) {
      if (e.target.id.length < 7) return

      setRestaurant({ ...restaurant, s_color: e.target.id })

      
    }
    return
  }

  return (
    <div className='flex gap-0.5 md:gap-3 flex-wrap' onClick={handleClick}>
      {colors.map((col, i) => (
        <div
          key={col}
          className='block w-8 h-8 md:w-12 md:h-12 p-1 rounded-full bg-white border-2'
          style={{
            borderColor: `${col == restaurant.s_color ? col : 'transparent'}`
          }}
        >
          <span
            id={col}
            className='w-full h-full block rounded-full'
            style={{ backgroundColor: `${col}` }}
          ></span>
        </div>
      ))}
      <div
        className='flex  w-8 h-8 md:w-12 md:h-12  rounded-full bg-white p-1 border-2 '
        style={{
          borderColor: `${
            restaurant.s_color ? restaurant.s_color : 'transparent'
          }`
        }}
      >
        <label
        htmlFor='pickerColor'
          className='block w-full h-full rounded-full'
          style={{
            backgroundColor: `${restaurant.s_color}`
          }}
        ></label>
        <input
          onChange={handleColorPicker}
          id='pickerColor'
          type='color'
          className='absolute opacity-0 w-1 h-1'
        />
      </div>
    </div>
  )
}

export default PickColor
