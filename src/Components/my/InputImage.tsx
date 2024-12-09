import uploadSVG from '@/assets/all/upload.svg'

import Title3 from './Title3'
import { InputHTMLAttributes, useState } from 'react'
import HandleFormSubmit from '@/utils/handleForSubmit'
import { routesApi } from '@/data/routes'
import { useDataGlobalContext } from '@/Context/GlobalContext'

function InputImage({ className = '', title = '', content = '', type = '' }) {
  const [complete, setComplete] = useState(false)
  const { error, handleSubmitForm, isPending } = HandleFormSubmit()

  const { setRestaurant } = useDataGlobalContext()

  const setImageToApi = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setComplete(false)

    const imageContent = e.target.files[0]

    if (!imageContent) return
    const data = await handleSubmitForm(routesApi.logoRestaurant, {
      singleImage: imageContent,
      type
    })

    if (!data) {
      return
    }

    const { urlImagen } = data as { urlImagen: string }

    setRestaurant((prev) => {
      return { ...prev, logo_url: urlImagen }
    })
    setComplete(true)
  }

  return (
    <div className={`flex-1 flex flex-col gap-3 ${className}`}>
      <Title3>{title}</Title3>
      <input
        id={type}
        type='file'
        className='hidden'
        onChange={setImageToApi}
        disabled={isPending}
      />
      <label
        htmlFor={type}
        className='flex justify-center items-center w-full max-w-sm md:p-6 gap-2 text-sm md:text-xl md:font-medium bg-gray-100 h-16 md:h-28  rounded-lg cursor-pointer hover:bg-gray-200 hover:text-gray-800'
      >
        <picture className='w-7 h-7 block z-10'>
          <img className='h-full' src={uploadSVG} alt='' />
        </picture>
        {content}
      </label>
    </div>
  )
}

export default InputImage
