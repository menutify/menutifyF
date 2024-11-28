import OrderBar from './OrderBar'
import Title2 from './Title2'
import Parr from './Parr'
import { useState } from 'react'
import arrow from '../../assets/login/arrow.svg'
import { carrouselData } from '@/data/carrouselData'



function MyCarrousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Función para avanzar a la siguiente imagen
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carrouselData.length)
  }

  // Función para regresar a la imagen anterior
  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 +carrouselData.length) %carrouselData.length
    )
  }
  return (
    <div className='relative w-full max-w-[90%] overflow-hidden'>
      {/* Carrusel de imágenes */}
      <div
        className='flex transition-transform duration-300'
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carrouselData.map((data, index) => (
          <div key={index} className='w-full flex-shrink-0 flex flex-col justify-center items-center gap-3'>
            <div className='mb-3 w-5/6 rounded-md shadow-xl shadow-[#0004]'>

            <img
              src={data.img}
              alt={`Imagen ${index + 1}`}
              className='w-full h-auto rounded-md '
              />
              </div>
              <Title2>{data.title}</Title2>
              <Parr className='text-center text-parr_color_3'>{data.parr}</Parr>
          </div>
        ))}
      </div>

      {/* Botones de navegación */}
      <div className='flex relative  h-9 justify-center gap-20 items-center'>
        <button  onClick={prevImage} className='  bg-transparent   '>
         <img className='h-full w-4' src={arrow} alt="" />
        </button>

        <OrderBar state={currentIndex as 1 | 2 | 0} />

        <button  onClick={nextImage} className='  bg-transparent   '>
         <img className='h-full w-4 rotate-180' src={arrow} alt="" />
        </button>
      </div>
    </div>
  )
}

export default MyCarrousel
