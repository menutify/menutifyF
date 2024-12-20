import InputDashboard from '@/Components/my/InputDashboard'
import InputDashboardType2 from '@/Components/my/InputDashboardType2'
import Title2 from '@/Components/my/Title2'
import { Card } from '@/Components/ui/card'
import wspSVG from '@/assets/all/wsp.svg'
import hourSVG from '@/assets/all/hour.svg'
import moneySVG from '@/assets/all/money.svg'
import sendSVG from '@/assets/all/send.svg'
import mapSVG from '@/assets/all/map.svg'
import { Button } from '@/Components/ui/button'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import HandleFormSubmit from '@/utils/handleForSubmit'
import { routesApi } from '@/data/routes'
import InputImage from '@/Components/my/InputImage'
import { useState } from 'react'

function RestaurantDataModal({ className = '' }) {
  const [imageLogoDataContainer, setImageLogoDataContainer] = useState<File>()
  const { restaurant, setRestaurant } = useDataGlobalContext()
  const { error, isPending, handlePatchFormSubmit } = HandleFormSubmit()

  const submitData = async () => {
    try {
      if (restaurant.changed === true) {
        const data = await handlePatchFormSubmit(routesApi.restaurant, {
          ...restaurant,
          singleImage: imageLogoDataContainer
        })

        if (!data) return

        const { myUrl } = data as { myUrl: string }
        
        setRestaurant({
          ...restaurant,
          state: true,
          changed: false,
          logo_url: myUrl ? myUrl : restaurant.logo_url
        })
      }
    } catch (error) {
      console.log('Error al enviar las solicitudes:', error)
    }
  }

  return (
    <Card className={`w-full p-3 md:p-6 flex flex-col gap-4 ${className}`}>
      <Title2 className='text-xl md:text-3xl'>Datos del restaurante</Title2>
      <InputImage
        setImageDataContainer={setImageLogoDataContainer}
        content={'Subir logo'}
        type='logo'
      />
      <div className='flex flex-col gap-2 md:gap-4 '>
        <InputDashboard
          name='name'
          className='flex-1'
          logoInput={mapSVG}
          ph={'Añade el nombre de tu local'}
          title={'Nombre'}
        />
        <InputDashboardType2
          name='desc'
          className='flex-1'
          logoInput={mapSVG}
          ph={'Añade una descripción'}
          title={'Descripción'}
        />
        <div className='flex w-full gap-2 md:gap-4 md:flex-col lg:flex-row md:flex-wrap'>
          <InputDashboard
            name='address'
            className='flex-1'
            logoInput={mapSVG}
            ph={'Añade la dirección de tu local'}
            title={'Dirección'}
          />
          <InputDashboard
            name='number'
            className='flex-1'
            logoInput={wspSVG}
            ph={'Añade un numero de WhatsApp'}
            title={'Whatsapp'}
          />
        </div>
        <div className='flex w-full gap-2 md:gap-4 md:flex-col lg:flex-row md:flex-wrap'>
          <InputDashboard
            name='hour'
            className='flex-1'
            logoInput={hourSVG}
            ph={'Añade tu horario'}
            title={'Horario'}
          />
          <InputDashboard
            name='currency'
            className='flex-1'
            logoInput={moneySVG}
            ph={'$$$'}
            title={'Moneda'}
          />
        </div>
        <InputDashboard
          name='send_method'
          logoInput={sendSVG}
          ph={'Ningún metodo seleccionado'}
          title={'Opciones de envió'}
        />
      </div>
      {error.error && <span>{error.msg}</span>}
      <Button onClick={submitData} disabled={isPending && true}>
        Enviar
      </Button>
    </Card>
  )
}

export default RestaurantDataModal
