import React, { useState } from 'react'

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
  const [indexColor, setIndexColor] = useState('#FF5733')
  const [colorPicker, setColorPicker] = useState('#000000')

  const handleColorPicker = (e) => {
    setIndexColor(e.target.value)
    setColorPicker(e.target.value)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clickedElement = e.target.closest('div[id]') // Busca el div con el atributo `id`
    if (clickedElement) {
      const id = clickedElement.id
      if (id.length < 7) return
      console.log({ id })
      setIndexColor(id)
    }
    return
  }

  return (
    <div className='flex gap-0.5 md:gap-3 flex-wrap' onClick={handleClick}>
      {colors.map((col, i) => (
        <div
          key={col}
          id={col}
          className='block w-8 h-8 md:w-12 md:h-12 p-1 rounded-full bg-white border-2'
          style={{ borderColor: `${col == indexColor ? col : 'transparent'}` }}
        >
          <span
            className='w-full h-full block rounded-full'
            style={{ backgroundColor: `${col}` }}
          ></span>
        </div>
      ))}
      <div className='flex justify-center items-center mt-1 h-[22px] w-[22px] ml-1 md:w-[36px] md:h-[36px]  rounded-full bg-white '>
        <label
          htmlFor='pickerColor'
          className='block w-full h-full   rounded-full'
          style={{ backgroundColor: `${colorPicker}` }}
        ></label>
        <input
          onChange={handleColorPicker}
          id='pickerColor'
          type='color'
          className='absolute opacity-0'
        />
      </div>
    </div>
  )
}

export default PickColor
