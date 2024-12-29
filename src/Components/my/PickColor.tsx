import { useDataGlobalContext } from '@/Context/GlobalContext'
import React from 'react'
import colorPallete from '@/assets/restaurant/colorpallete.svg'
function PickColor() {
  const colors = React.useMemo(
    () => [
      '#FF5733', // Bright Orange
      '#33FF57', // Bright Green
      '#5733FF', // Bright Purple
      '#FF33A1', // Bright Pink
      '#33A1FF', // Bright Blue
      '#A1FF33', // Bright Lime
      '#FF3333', // Bright Red
      '#FFA133', // Bright Amber
      '#33FFF5' // Bright Cyan
    ],
    []
  )
  const { menu, setMenu } = useDataGlobalContext()
  const handleColorPicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMenu({ ...menu, s_color: e.target.value, changed: true })
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    if (target.id && target.id.length >= 7) {
      setMenu({ ...menu, s_color: target.id, changed: true })
    }
  }

  return (
    <div className='flex gap-0.5 md:gap-3 flex-wrap' onClick={handleClick}>
      {colors.map((col) => (
        <div
          key={col}
          className='block w-8 h-8 md:w-12 md:h-12 p-1 rounded-full bg-white border-2'
          style={{
            borderColor: `${col == menu.s_color ? col : 'transparent'}`
          }}
        >
          <span
            id={col}
            className='w-full h-full block rounded-full cursor-pointer'
            style={{ backgroundColor: `${col}` }}
          ></span>
        </div>
      ))}
      <div className='flex  w-8 h-8 md:w-12 md:h-12  rounded-full bg-white p-1 border-2 border-transparent '>
        <label
          htmlFor='pickerColor'
          className='block w-full h-full rounded-full cursor-pointer'
        >
          <img src={colorPallete} alt='' />
        </label>
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
