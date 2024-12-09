import Title2 from '@/components/my/Title2'
import { Button } from '@/components/ui/button'
import { useDataGlobalContext } from '@/Context/GlobalContext'

function FormRestaurantUpdate2() {
  const { restaurant, setRestaurant } = useDataGlobalContext()

  const toggleDay = (day: number) => {
    setRestaurant((prev) => {
      return {
        ...restaurant,
        days: prev.days.includes(day)
          ? prev.days.filter((d) => d !== day)
          : [...prev.days, day]
      }
    })
  }



  return (
    <div className='w-full h-full flex-complete flex-col'>
      <Title2 className='text-xl md:text-3xl font-bold mb-4'>
        Horario del Negocio
      </Title2>

      {/* Días */}
      <div className='flex justify-center gap-2 mb-4'>
        {['D', 'L', 'M', 'Mi', 'J', 'V', 'S'].map((label, index) => (
          <button
            key={index}
            onClick={() => toggleDay(index)}
            className={`w-8 h-8 flex-complete md:w-12 md:h-12 text-xs md:text-lg rounded-full text-white ${
              restaurant.days.includes(index) ? 'bg-blue-500' : 'bg-gray-400'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Inputs de Horarios */}
      <div className='flex flex-col gap-2 mb-4'>
        <div className='flex items-center gap-2'>
          <label className='w-20'>Apertura:</label>
          <input
            type='time'
            value={restaurant.hour[0]}
            onChange={(e) =>
              setRestaurant((data) => {
                return { ...restaurant, hour: [e.target.value, data.hour[1]] }
              })
            }
            className='border rounded px-2 py-1 bg-white'
          />
        </div>
        <div className='flex items-center gap-2'>
          <label className='w-20'>Cierre:</label>
          <input
            type='time'
            value={restaurant.hour[1]}
            onChange={(e) =>
              setRestaurant((data) => {
                return { ...restaurant, hour: [data.hour[0], e.target.value] }
              })
            }
            className='border rounded px-2 py-1 bg-white'
          />
        </div>
      </div>

     
      
    </div>
  )
}

export default FormRestaurantUpdate2
