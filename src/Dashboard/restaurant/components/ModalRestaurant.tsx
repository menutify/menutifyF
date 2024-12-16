import { Button } from '@/Components/ui/button'
import { restaurantData } from '@/data/text'
import { useEffect, useMemo, useState } from 'react'
import FormRestaurantUpdate from './FormRestaurantUpdate'
import FormRestaurantUpdate2 from './FormRestaurantUpdate2'
import { Card } from '@/Components/ui/card'
import FormRestaurantUpdate3 from './FormRestaurantUpdate3'
import { useLocation } from 'react-router-dom'
import FormDesc from './FormDesc'
import {
  domainMethod,
  nameMethodValidator,
  restaurantAddress,
  restaurantNumber,
  restaurantSendMethod
} from '@/utils/formScheme'
import { useDataGlobalContext } from '@/Context/GlobalContext'
interface ModalRestaurant {
  imgSVG: string
  name: string
  className?: string
}

function ModalRestaurant({ imgSVG, name, className = '' }: ModalRestaurant) {
  const { menu, restaurant } = useDataGlobalContext()
  const [modalVisible, setModalVisible] = useState(false)
  const location = useLocation()

  const closeModalInBackground = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    const target = e.target as HTMLElement

    if (target.id === 'modal') setModalVisible(false)
  }

  const arrayValueForm = useMemo(
    () => [
      {
        scheme: restaurantAddress,
        value: {
          address: restaurant.address || ''
        },
        title: restaurantData.modal_address,
        ph: restaurantData.modal_address
      },
      {
        scheme: restaurantNumber,
        value: {
          number: restaurant.number || ''
        },
        title: restaurantData.modal_number,
        ph: restaurantData.modal_number_ph
      },
      {
        scheme: restaurantSendMethod,
        value: {
          send_method: restaurant.send_method || ''
        },
        title: restaurantData.modal_send,
        ph: restaurantData.modal_send_ph
      },
      {
        scheme: domainMethod,
        value: {
          domain: menu.domain || ''
        },
        title: restaurantData.modal_domain,
        ph: restaurantData.modal_domain_ph
      },
      {
        scheme: nameMethodValidator,
        value: {
          name: restaurant.name || ''
        },
        title: restaurantData.modal_name,
        ph: restaurantData.modal_name_ph
      }
    ],
    []
  )

  const [defaultValueForm, setDefaultValueForm] = useState(arrayValueForm[0])

  useEffect(() => {
    if (name === 'number') {
      setDefaultValueForm(arrayValueForm[1])
    } else if (name === 'send_method') {
      setDefaultValueForm(arrayValueForm[2])
    } else if (name === 'domain') {
      setDefaultValueForm(arrayValueForm[3])
    } else if (name === 'name') {
      setDefaultValueForm(arrayValueForm[4])
    }
  }, []) // Agregar name como dependencia

  return modalVisible ? (
    <>
      <picture
        onClick={() => setModalVisible(true)}
        className={`h-full w-4 md:w-6 cursor-pointer ${className}`}
      >
        <img className='h-full' src={imgSVG} alt='' />
      </picture>
      <div
        id='modal'
        className='fixed w-screen z-20 h-full top-0 left-0 overflow-y-hidden flex-complete bg-[#0001]'
        onClick={closeModalInBackground}
      >
        <Card className='max-w-[500px]  w-1/2 min-w-[350px] p-4 bg-white rounded-xl flex-complete flex-col gap-2'>
          {location.pathname === '/dashboard/restaurant' &&
            (name == 'currency' || name == 'hour' ? (
              name == 'hour' ? (
                <FormRestaurantUpdate2 />
              ) : (
                <FormRestaurantUpdate3 />
              )
            ) : name == 'desc' ? (
              <FormDesc visibilityModal={setModalVisible} />
            ) : (
              <FormRestaurantUpdate
                visibilityModal={setModalVisible}
                name={name}
                ph={defaultValueForm.ph}
                scheme={defaultValueForm.scheme}
                title={defaultValueForm.title}
                value={defaultValueForm.value}
              />
            ))}

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
      className={`h-full w-4 md:w-6 cursor-pointer ${className}`}
    >
      <img className='h-full' src={imgSVG} alt='' />
    </picture>
  )
}

export default ModalRestaurant
