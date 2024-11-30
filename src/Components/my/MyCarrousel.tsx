import OrderBar from './OrderBar'
import Title2 from './Title2'
import Parr from './Parr'
import { useEffect, useRef, useState } from 'react'
import { carrouselData } from '@/data/carrouselData'

function MyCarrousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Función para avanzar a la siguiente imagen
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carrouselData.length)
  }

  const changeIndex = (index: number) => {
    setCurrentIndex(index)
    // console.log({ index })
  }

  // Función para regresar a la imagen anterior
  // const prevImage = () => {
  //   setCurrentIndex(
  //     (prevIndex) =>
  //       (prevIndex - 1 + carrouselData.length) % carrouselData.length
  //   )
  // }

  useEffect(() => {
    // Limpiar cualquier timeout previo
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Configurar el timeout para avanzar automáticamente
    timeoutRef.current = setTimeout(() => {
      nextImage()
    }, 5000) // Avanzar cada 2 segundos

    // Limpiar el timeout cuando el componente se desmonte
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentIndex])

  const espaciado = 30

  return (
    <div className='fixed top-1/2 -translate-y-1/2  max-w-[36%] overflow-hidden '>
      {/* Carrusel de imágenes */}
      <div
        className={`flex  transition-transform duration-500`}
        style={{
          gap: `${espaciado}px`,
          transform: `translateX(calc(-${currentIndex * 100}% - ${
            currentIndex * espaciado
          }px))`
        }}
      >
        {carrouselData.map((data, index) => (
          <div
            key={index}
            className='top-0 left-0 w-full z-40 flex-shrink-0 flex flex-col justify-center items-center gap-4'
          >
            {/* before:block before:absolute before:h-20  before:bottom-0  before:w-5/6 before:rounded-md before:left-0 before:right-0 before:m-auto before:z-10 before:bg-[#000000ff] before:shadow-xl before:shadow-[#000000ff]  */}
            <div className='mb-6 w-full  relative rounded-3xl overflow-hidden'>
              <span className='absolute w-4/5 h-10 left-0 right-0 m-auto bg-[#00000033] shadow-md shadow-[#00000022] bottom-1.5 rounded-3xl -z-10'></span>
              <img
                src={data.img}
                alt={`Imagen ${index + 1}`}
                className='w-[97%] h-[97%] rounded-3xl  -z-20 '
              />
            </div>
            <Title2>{data.title}</Title2>
            <Parr className='text-center text-parr_color_3'>{data.parr}</Parr>
          </div>
        ))}
      </div>

      {/* Botones de navegación */}
      <div className='flex relative mt-6 justify-center gap-20 items-center'>
        <OrderBar
          state={currentIndex}
          indexLen={carrouselData.length}
          func={changeIndex}
        />
      </div>
    </div>
  )
}

export default MyCarrousel
