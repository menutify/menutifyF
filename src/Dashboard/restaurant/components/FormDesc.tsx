import Title2 from '@/Components/my/Title2'
import { Button } from '@/Components/ui/button'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import { useState } from 'react'

function FormDesc({ visibilityModal }) {
  const { setRestaurant } = useDataGlobalContext()

  const [getData, setGetData] = useState('')

  const setDataToContext = () => {
    if (getData.length < 255) {
      setRestaurant((prev) => ({ ...prev, desc: getData, changed: true }))
      visibilityModal(false)
      return
    }

    return
  }

  return (
    <div className='w-full bg-yellow-50 h-full flex-complete flex-col'>
      <Title2 className='text-xl md:text-3xl font-bold mb-4'>
        Descripción
      </Title2>

      {/* Días */}
      <div className='flex flex-col justify-center w-full h-40 gap-2 mb-4 px-4'>
        <textarea
          onChange={(e) => setGetData(e.target.value)}
          className='w-full h-full bg-red-50 resize-none flex focus:outline-none outline-none'
          placeholder='Escribe la descripción de tu local ...'
          maxLength={250}
        ></textarea>
        <span>{getData.length}/250</span>
      </div>

      {/* Inputs de Horarios */}
      <Button className='w-full' onClick={setDataToContext}>
        Guardar
      </Button>
    </div>
  )
}

export default FormDesc
