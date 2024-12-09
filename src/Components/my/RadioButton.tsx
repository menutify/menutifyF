import { Card } from '../ui/card'
import { useDataGlobalContext } from '@/Context/GlobalContext'

function RadioButton() {
  const { restaurant, setRestaurant } = useDataGlobalContext()

  const handleOptionChange = () => {
    setRestaurant((e) => {
      return { ...restaurant, f_color: !e.f_color }
    })
  }
  return (
    <div className='flex gap-4 w-full relative'>
      <Card className={`w-32 h-32 overflow-hidden relative`}>
        <input
          type='radio'
          id='option1'
          name='selection'
          value='option1'
          checked={restaurant.f_color === false}
          onChange={handleOptionChange}
          className='hidden'
        />
        <label
          htmlFor='option1'
          className='cursor-pointer w-full h-full bg-gray-200 flex justify-center items-end relative'
        >
          <div
            className={`w-4/5 h-4/5 bg-black before:block before:w-4 before:h-4 before:absolute before:border before:rounded-full before:top-1 before:bg-white before:right-1 
                ${
                  restaurant.f_color
                    ? ''
                    : 'after:block after:w-3 after:h-3 after:absolute after:border after:rounded-full after:top-1.5 after:bg-green-700 after:right-1.5'
                }`}
            style={{ borderRadius: '12px 12px 0 0' }}
          ></div>
        </label>
      </Card>
      <Card className={`w-32 h-32 overflow-hidden relative`}>
        <input
          type='radio'
          id='option2'
          name='selection'
          value='option2'
          checked={restaurant.f_color === true}
          onChange={handleOptionChange}
          className='hidden'
        />
        <label
          htmlFor='option2'
          className='cursor-pointer w-full h-full bg-gray-200 flex justify-center items-end relative'
        >
          <div
            className={`w-4/5 h-4/5 bg-white before:block before:w-4 before:h-4 before:absolute before:border before:rounded-full before:top-1 before:bg-white before:right-1 
                ${
                  restaurant.f_color
                    ? 'after:block after:w-3 after:h-3 after:absolute after:border after:rounded-full after:top-1.5 after:bg-green-700 after:right-1.5'
                    : ''
                }`}
            style={{ borderRadius: '12px 12px 0 0' }}
          ></div>
        </label>
      </Card>
    </div>
  )
}

export default RadioButton
