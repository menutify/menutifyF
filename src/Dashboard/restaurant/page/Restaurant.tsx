import InputDashboard from '@/components/my/inputDashboard'
import Title2 from '@/components/my/Title2'
import { Card } from '@/components/ui/card'
//images
import wspSVG from '@/assets/all/wsp.svg'
import hourSVG from '@/assets/all/hour.svg'
import moneySVG from '@/assets/all/money.svg'
import sendSVG from '@/assets/all/send.svg'
import mapSVG from '@/assets/all/map.svg'
import arrowSVG from '@/assets/login/arrowWhite.svg'
import eyeSVG from '@/assets/all/eyewhite.svg'
import penSVG from '@/assets/all/pen.svg'

import { Button } from '@/components/ui/button'
import InputImage from '@/components/my/InputImage'
import Title3 from '@/components/my/Title3'
import Parr from '@/components/my/Parr'
import RadioButton from '@/components/my/radioButton'
import PickColor from '@/components/my/PickColor'

function Restaurant() {
  return (
    <div className='flex flex-col md:flex-row relative md:pt-20 py-20'>
      <div className='fixed z-40 md:z-0 md:absolute bottom-0 left-0 md:top-0 md:right-0 md:justify-end justify-center items-center flex w-full h-20 bg-white'>
        <Button className=' bg-border_input_color flex gap-4  px-4 md:pl-8 md:pr-1 md:rounded-lg  rounded-lg h-14'>
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
            <div className='flex w-full gap-2 md:gap-4 '>
              <InputDashboard
                className='flex-1'
                logoInput={mapSVG}
                ph={'Añade tu dirección'}
                title={'Dirección'}
              />
              <InputDashboard
                className='flex-1'
                logoInput={wspSVG}
                ph={'Añade tu whatsapp'}
                title={'Whatsapp'}
              />
            </div>
            <div className='flex w-full gap-2 md:gap-4 '>
              <InputDashboard
                className='flex-1'
                logoInput={hourSVG}
                ph={'Añade tu horario'}
                title={'Horario'}
              />
              <InputDashboard
                className='flex-1'
                logoInput={moneySVG}
                ph={'$$$'}
                title={'Moneda'}
              />
            </div>
            <InputDashboard
              logoInput={sendSVG}
              ph={'Ningún metodo seleccionado'}
              title={'Opciones de envió'}
            />
          </div>
        </Card>
      </section>
      <section className='flex-1 flex flex-col items-center mt-2 md:mt-0 md:p-2 '>
        <Card className='w-full  p-3 md:p-6 flex flex-col gap-6 '>
          <Title2 className='text-xl md:text-3xl'>Personaliza tu menú</Title2>
          <div className='flex mb-3 gap-2'>
            <InputImage title={'Menu logo'} content={'Subir logo'} />
            <InputImage title={'Fondo de Página'} content={'Subir fondo'} />
          </div>
          <span className='block h-0.5 w-full bg-[#ddd4]'></span>
          <Title3>Personaliza tu dominio</Title3>
          <div className='flex gap-0.5 mb-2'>
            <Parr className='text-black underline'>
              http://locahost:5173/algomas
            </Parr>
            <Parr className='text-black'>_</Parr>
            <picture className='h-full w-6 ml-3 cursor-pointer'>
              <img src={penSVG} alt='' />
            </picture>
          </div>
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
