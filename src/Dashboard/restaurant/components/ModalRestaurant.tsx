import { Button } from '@/components/ui/button'
import { restaurantData } from '@/data/text'
import { useState } from 'react'
import FormRestaurantUpdate from './FormRestaurantUpdate'
import FormRestaurantUpdate2 from './FormRestaurantUpdate2'
import { Card } from '@/components/ui/card'
import FormRestaurantUpdate3 from './FormRestaurantUpdate3'

function ModalRestaurant({ imgSVG, name }) {
  const [modalVisible, setModalVisible] = useState(false)

  const closeModalInBackground = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target.id === 'modal') setModalVisible(false)
  }

  return modalVisible ? (
    <>
      <picture
        onClick={() => setModalVisible(true)}
        className='h-full w-4 md:w-6 cursor-pointer '
      >
        <img src={imgSVG} alt='' />
      </picture>
      <div
        id='modal'
        className='fixed w-screen z-20 h-full top-0 left-0 overflow-y-hidden flex-complete bg-[#0001]'
        onClick={closeModalInBackground}
      >
        <Card className='max-w-[500px]  w-1/2 min-w-[350px] p-4 bg-white rounded-xl flex-complete flex-col gap-2'>
          {name == 'currency' || name == 'hour' ? (
            name == 'hour' ? (
              <FormRestaurantUpdate2 />
            ) : (
              <FormRestaurantUpdate3/>
            )
          ) : (
            <FormRestaurantUpdate
              visibilityModal={setModalVisible}
              name={name}
            />
          )}
          <Button
            className='bg-sb_bg w-full'
            onClick={() => setModalVisible(false)}
          >
            {restaurantData.modal_exit}
          </Button>
        </Card>
      </div>
    </>
  ) : (
    <picture
      onClick={() => setModalVisible(true)}
      className='h-full w-4 md:w-6 cursor-pointer '
    >
      <img src={imgSVG} alt='' />
    </picture>
  )
}

export default ModalRestaurant
