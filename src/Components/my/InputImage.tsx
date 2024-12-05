import uploadSVG from '@/assets/all/upload.svg'

import Title3 from './Title3'

function InputImage({ className = '', title, content }) {
  return (
    <div className={`flex-1 flex flex-col gap-3 ${className}`}>
      <Title3>{title}</Title3>
      <input id='fileInput' type='file' className='hidden' />
      <label
        htmlFor='fileInput'
        className='flex justify-center items-center w-full max-w-sm md:p-6 gap-2 text-sm md:text-xl md:font-medium bg-gray-100 h-16 md:h-28  border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-gray-800 '
      >
        <picture className='w-7 h-7 block z-20'>
          <img className='h-full' src={uploadSVG} alt='' />
        </picture>
        {content}
      </label>
    </div>
  )
}

export default InputImage
