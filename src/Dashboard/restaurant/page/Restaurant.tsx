import Title2 from '@/Components/my/Title2'
import { Card } from '@/Components/ui/card'
import { Button } from '@/Components/ui/button'
import InputImage from '@/Components/my/InputImage'
import Title3 from '@/Components/my/Title3'
import RadioButton from '@/Components/my/RadioButton'
import PickColor from '@/Components/my/PickColor'
//images
import UrlDetails from '../components/UrlDetails'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import HandleFormSubmit from '@/utils/handleForSubmit'
import { routesApi } from '@/data/routes'
import { useState } from 'react'
import RestaurantDataCard from './RestaurantDataCard'

function Restaurant() {
  const [imageLogoDataContainer, setImageLogoDataContainer] = useState<File>()
  const [imageHeaderDataContainer, setImageHeaderDataContainer] =
    useState<File>()
  const [statusCode, setStatusCode] = useState(0)
  const { restaurant, setRestaurant, menu, setMenu } = useDataGlobalContext()

  const { error, isPending, handlePatchFormSubmit } = HandleFormSubmit()

  const submitData = async () => {
    try {
      const promises: Promise<boolean | Record<string, any>>[] = []

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

        console.log({ changed: menu.changed, results })
        // Manejo de resultados individuales
        if (restaurant.changed === true && !results[0]) {
          console.log('Error al editar restaurante')
          return
        }

        // if (menu.changed === true && !results[1]) {
        //   console.log('Error al editar menú')
        //   return
        // }

        if (
          restaurant.changed === true &&
          restaurant.address &&
          restaurant.currency
        ) {
          const data = results[0]

          const { myUrl } = data as { myUrl: string }
          console.log(myUrl)
          setRestaurant({
            ...restaurant,
            state: true,
            changed: false,
            logo_url: myUrl ? myUrl : restaurant.logo_url
          })
        }

        if (menu.changed === true) {
          let data
          if (results.length == 1) {
            data = results[0]
          } else {
            data = results[1]
          }

          const { myUrl, status } = data as { myUrl: string; status: number }
          console.log(myUrl, status)
          if (status == 204) {
            setStatusCode(status)

            setMenu({
              ...menu,
              changed: false,
              header_url: myUrl,
              domain: menu.id + ''
            })
            return
          }
          setMenu({ ...menu, changed: false, header_url: myUrl })
        }
      }
    } catch (error) {
      console.log('Error al enviar las solicitudes:', error)
    }
  }

  return (
    <div className='flex flex-col md:flex-row relative md:pt-20'>
      <div
        className='fixed z-40 md:z-0 md:absolute bottom-0 left-0 md:top-0 md:right-0 md:items-end justify-center items-center flex w-full h-[72px] bg-white flex-col'
        style={{ borderTop: '.2px solid #0003' }}
      >
        <Button
          className={`${
            isPending ? 'bg-white' : 'bg-border_input_color'
          } flex-complete p-4 gap-4  md:px-10 md:rounded-lg  rounded-lg h-14 relative`}
          onClick={submitData}
          disabled={isPending}
        >
          Guardar cambios
        </Button>
        {error.error && (
          <p className='absolute -bottom-6 block text-red-500'>{error.msg}</p>
        )}
      </div>
      <section className='flex-1 flex flex-col items-center p-2'>
        <RestaurantDataCard />
      </section>
      <section className='md:min-w-[475px] flex-1 flex flex-col items-center mt-2 md:mt-0 p-2 '>
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
          <UrlDetails status={statusCode} />
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
