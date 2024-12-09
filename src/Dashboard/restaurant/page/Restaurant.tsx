import InputDashboard from '@/Components/my/InputDashboard'
import Title2 from '@/components/my/Title2'
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
import arrowSVG from '@/assets/login/arrowWhite.svg'
import eyeSVG from '@/assets/all/eyewhite.svg'
import UrlDetails from '../components/UrlDetails'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import HandleFormSubmit from '@/utils/handleForSubmit'
import { routesApi } from '@/data/routes'

function Restaurant() {
  const { restaurant, setRestaurant } = useDataGlobalContext()

  const { error, isPending, handlePatchSubmit } = HandleFormSubmit()

  const submitData = async () => {
    const data = await handlePatchSubmit(routesApi.restaurant, restaurant)
    if (!data) return
    if (restaurant.address && restaurant.currency) {
      setRestaurant({ ...restaurant, state: 1 })
    }
    console.log('Cambios exitosos')
  }

  return (
    <div className='flex flex-col md:flex-row relative md:pt-20 py-20'>
      <div className='fixed z-40 md:z-0 md:absolute bottom-0 left-0 md:top-0 md:right-0 md:justify-end justify-center items-center flex w-full h-20 bg-white'>
        <Button
          className={`${
            isPending ? 'bg-white' : 'bg-border_input_color'
          } flex gap-4  px-4 md:pl-8 md:pr-1 md:rounded-lg  rounded-lg h-14`}
          onClick={submitData}
          disabled={isPending}
        >
          Guardar cambios
          <picture className='w-5 h-5 rotate-180'>
            <img src={arrowSVG} alt='' />
          </picture>{' '}
          |{' '}
          <picture className='w-5 h-5'>
            <img src={eyeSVG} alt='' />
          </picture>
        </Button>
      </div>
      <section className='flex-1 flex flex-col items-center md:p-2'>
        <Card className='w-full p-3 md:p-6 flex flex-col gap-4'>
          <Title2 className='text-xl md:text-3xl'>Datos del restaurante</Title2>
          <div className='flex flex-col gap-2 md:gap-4 '>
            <div className='flex w-full gap-2 md:gap-4 md:flex-col lg:flex-row md:flex-wrap'>
              <InputDashboard
                name='address'
                className='flex-1'
                logoInput={mapSVG}
                ph={'Añade tu dirección'}
                title={'Dirección'}
              />
              <InputDashboard
                name='number'
                className='flex-1'
                logoInput={wspSVG}
                ph={'Añade tu whatsapp'}
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
              title={'Menu logo'}
              content={'Subir logo'}
              type='logo'
            />
            <InputImage
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
