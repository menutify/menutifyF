import uploadSVG from '@/assets/all/upload.svg'

import Title3 from './Title3'
import { useState } from 'react'
import { useDataGlobalContext } from '@/Context/GlobalContext'

function InputImage({
  className = '',
  title = '',
  content = '',
  type = '',
  setImageDataContainer
}) {
  const [imgContainer, setImgContainer] = useState('')
  const { setMenu, setRestaurant, restaurant } = useDataGlobalContext()

  const handleImage = (e) => {
    e.preventDefault()
    const imageContent: File = e.target.files[0]
    if (imageContent) {
      setImageDataContainer(imageContent)
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result == 'string') {
          setImgContainer(e.target?.result)
        }
      }
      reader.readAsDataURL(imageContent)
      if (type === 'logo') {
        setRestaurant((prev) => ({ ...prev, changed: true }))
      } else {
        setMenu((prev) => ({ ...prev, changed: true }))
      }
    }
  }

  return (
    <div className={`flex-1 flex flex-col gap-3 ${className}`}>
      {title && <Title3>{title}</Title3>}
      <input id={type} type='file' className='hidden' onChange={handleImage} />
      <label
        htmlFor={type}
        className='flex justify-center items-center w-full max-w-sm md:p-0 gap-2 text-sm md:text-xl md:font-medium bg-gray-100 h-16 md:h-28  rounded-lg cursor-pointer hover:bg-gray-200 hover:text-gray-800 overflow-hidden'
      >
        <picture
          className={`${
            imgContainer === '' ? '  w-7 h-7' : 'w-full h-full'
          } block z-10`}
        >
          <img
            className=' h-full w-full object-contain'
            src={
              restaurant.logo_url === ''
                ? imgContainer === ''
                  ? uploadSVG
                  : imgContainer
                : restaurant.logo_url
            }
            alt=''
          />
        </picture>
        {imgContainer === '' ? content : ''}
      </label>
    </div>
  )
}

export default InputImage
