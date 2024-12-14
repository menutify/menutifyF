import InputDashboard from '@/Components/my/InputDashboard'
import Title2 from '@/Components/my/Title2'
import { Card } from '@/Components/ui/card'
import { Button } from '@/components/ui/button'
import InputImage from '@/Components/my/InputImage'
import Title3 from '@/Components/my/Title3'
import RadioButton from '@/Components/my/RadioButton'
import PickColor from '@/Components/my/PickColor'
//images
import wspSVG from '@/assets/all/wsp.svg'
import hourSVG from '@/assets/all/hour.svg'
import moneySVG from '@/assets/all/money.svg'
import sendSVG from '@/assets/all/send.svg'
import mapSVG from '@/assets/all/map.svg'
import UrlDetails from '../components/UrlDetails'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import HandleFormSubmit from '@/utils/handleForSubmit'
import { routesApi } from '@/data/routes'
import { useState } from 'react'
import InputDashboardType2 from '@/Components/my/InputDashboardType2'

function Restaurant() {
  const [imageLogoDataContainer, setImageLogoDataContainer] = useState<File>()
  const [imageHeaderDataContainer, setImageHeaderDataContainer] =
    useState<File>()
  const { restaurant, setRestaurant, menu, setMenu } = useDataGlobalContext()

  const { error, isPending, handlePatchFormSubmit } = HandleFormSubmit()

  const submitData = async () => {
    try {
      const promises = []

      if (restaurant.changed === true) {
        promises.push(
          handlePatchFormSubmit(routesApi.restaurant, {
            ...restaurant,
            singleImage: imageLogoDataContainer
          })
        )
      }

      if (menu.changed === true) {
        promises.push(
          handlePatchFormSubmit(routesApi.menu + '?size=header', {
            ...menu,
            singleImage: imageHeaderDataContainer
          })
        )
      }

      if (promises.length > 0) {
        const results = await Promise.all(promises)

        // Manejo de resultados individuales
        if (restaurant.changed === true && !results[0]) {
          console.log('Error al editar restaurante')
          return
        }

        if (menu.changed === true && !results[1]) {
          console.log('Error al editar menú')
          return
        }

        if (
          restaurant.changed === true &&
          restaurant.address &&
          restaurant.currency
        ) {
          const data = results[0]

          const { myUrl } = data
          console.log(myUrl)
          setRestaurant({
            ...restaurant,
            state: true,
            changed: false,
            logo_url: myUrl ? myUrl : restaurant.logo_url
          })
        }

        if (menu.changed === true && results[1]) {
          const data = results[1]
          const { myUrl } = data
          setMenu({ ...menu, changed: false, header_url: myUrl })
        }
      }
    } catch (error) {
      console.log('Error al enviar las solicitudes:', error)
    }
  }

  return (
    <div className='flex flex-col md:flex-row relative md:pt-20 py-20'>
      <div className='fixed z-40 md:z-0 md:absolute bottom-0 left-0 md:top-0 md:right-0 md:items-end justify-center items-center flex w-full h-20 bg-white flex-col'>
        <Button
          className={`${
            isPending ? 'bg-white' : 'bg-border_input_color'
          } flex-complete p-4 gap-4  md:px-10 md:rounded-lg  rounded-lg h-14 relative`}
          onClick={submitData}
          disabled={isPending}
        >
          Guardar cambios
          {error.error && (
            <p className='absolute -bottom-6 block text-red-500'>{error.msg}</p>
          )}
        </Button>
      </div>
      <section className='flex-1 flex flex-col items-center md:p-2'>
        <Card className='w-full p-3 md:p-6 flex flex-col gap-4'>
          <Title2 className='text-xl md:text-3xl'>Datos del restaurante</Title2>
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
        </Card>
      </section>
      <section className='md:min-w-[475px] flex-1 flex flex-col items-center mt-2 md:mt-0 md:p-2 '>
        <Card className='w-full  p-3 md:p-6 flex flex-col gap-6 '>
          <Title2 className='text-xl md:text-3xl'>Personaliza tu menú</Title2>
          <div className='flex mb-3 gap-2'>
            <InputImage
              setImageDataContainer={setImageLogoDataContainer}
              title={'Menu logo'}
              content={'Subir logo'}
              type='logo'
            />
            <InputImage
              setImageDataContainer={setImageHeaderDataContainer}
              title={'Fondo de Página'}
              content={'Subir fondo'}
              type='header'
            />
          </div>
          <span className='block h-0.5 w-full bg-[#ddd4]'></span>
          <Title3>Personaliza tu dominio</Title3>
          <UrlDetails />
          <span>Selecciona la versión que mas te guste</span>

          <RadioButton />
          <Title3>Elije tu color</Title3>
          <PickColor />
        </Card>
      </section>
    </div>
  )
}

export default Restaurant
