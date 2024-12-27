import ImgContainer from '@/Components/my/ImgContainer'
import Label1 from '@/Components/my/Label1'
import Parr1 from '@/Components/my/Parr1'
import Title1 from '@/Components/my/Title1'
import Title2 from '@/Components/my/Title2'
import { Card } from '@/Components/ui/card'
import planFooterImg from '@/assets/login/botton-right-image.png'
import checksvg from '@/assets/login/check.svg'
import arrowsvg from '@/assets/login/arrowOrange.svg'

function Plans() {
  return (
    <div className='p-[30px] min-h-screen flex-complete flex-col gap-[20px]'>
      <div className='p-[30px] bg-gray-100 flex-complete flex-col gap-[20px] w-full'>
        <Title1 className='w-full text-left'>
          Detalles de tu nueva suscripción
        </Title1>
        <div className='flex flex-col items-start w-full gap-[10px]'>
          <Card className='flex items-center justify-start gap-[15px] border-primary_color bg-primary_color bg-opacity-5 min-w-[300px] px-[20px] py-[15px] border-2 rounded-md w-1/2 max-w-[700px]'>
            <label
              htmlFor=''
              className='flex-complete relative bg-primary_color rounded-full w-[16px] h-[16px]'
            >
              <span className='bg-white w-[5px] h-[5px] rounded-full'></span>
            </label>
            <div className='flex flex-col items-start justify-center h-full pt-1'>
              <Parr1 className='font-semibold m-0'>Menutify PRO</Parr1>
              <Label1 className='text-parr_color_1 m-0'>
                ARS$ 20.000,00 / Mensual
              </Label1>
            </div>
          </Card>
          <Card className='flex items-center justify-start gap-[15px]  min-w-[300px] px-[20px] py-[15px] border-2 rounded-md w-1/2 max-w-[700px] shadow-sm relative opacity-80'>
            <label
              htmlFor=''
              className='flex-complete relative rounded-full w-[15px] h-[15px] border-parr_color_1 border'
            ></label>
            <span className='absolute text-[8px] text-parr_color_1 right-[10px] top-[10px] border rounded-sm px-[5px]'>
              NO DISPONIBLE
            </span>
            <div className='flex flex-col items-start justify-center h-full pt-1'>
              <Parr1 className='font-semibold text-parr_color_1 m-0'>
                Menutify PRO
              </Parr1>
              <Label1 className='text-parr_color_1 m-0'>
                ARS$ 20.000,00 / Mensual
              </Label1>
            </div>
          </Card>
        </div>
        <Card className='flex items-start p-[20px] w-full  justify-between'>
          <div className='bg-[url(/src/assets/login/menutify-pro-image.png)] bg-cover rounded-2xl bg-no-repeat  border p-[15px] py-[30px] text-white h-full'>
            <Title2 className='mb-2'>Menutify PRO</Title2>
            <div>
              <Parr1>ARS 20.000,00 / Mes</Parr1>
              <Parr1>1 Miembro activo</Parr1>
            </div>
          </div>
          <section className='flex flex-col items-start justify-start gap-[10px] h-full '>
            <Parr1 className='border-b-2 border-primary_color font-semibold'>
              Incluye
            </Parr1>
            <Parr1 className='flex-complete gap-[5px] font-medium'>
              <ImgContainer className='h-3 w-3' src={checksvg} />
              Menú digital
            </Parr1>
            <Parr1 className='flex-complete gap-[5px] font-medium'>
              <ImgContainer className='h-3 w-3' src={checksvg} />
              Menú para impresión
            </Parr1>
            <Parr1 className='flex-complete gap-[5px] font-medium'>
              <ImgContainer className='h-3 w-3' src={checksvg} />
              Edición en tiempo real
            </Parr1>
            <Parr1 className='flex-complete gap-[5px] font-medium'>
              <ImgContainer className='h-3 w-3' src={checksvg} />
              Exportación a PDF y QR
            </Parr1>
          </section>
          <section className='flex flex-col items-start justify-start gap-[10px] h-full '>
            <Parr1 className='border-b-2 border-primary_color font-semibold'>
              Con tu suscripción
            </Parr1>
            <Parr1 className='flex-complete gap-[5px] font-medium'>
              <ImgContainer className='h-3 w-3' src={arrowsvg} />
              Soporte 24/7
            </Parr1>
            <Parr1 className='flex-complete gap-[5px] font-medium'>
              <ImgContainer className='h-3 w-3' src={arrowsvg} />
              Tutoriales y asistencia
            </Parr1>
            <Parr1 className='flex-complete gap-[5px] font-medium'>
              <ImgContainer className='h-3 w-3' src={arrowsvg} />
              Acceso estritorio/mobile
            </Parr1>
          </section>
        </Card>
        <div className='block w-full h-[1px] bg-parr_color_2'></div>
        <div className='flex justify-between items-center w-full'>
          <Title1>Total</Title1>
          <Title1>ARS$ 20.000,00 / MES</Title1>
        </div>
      </div>
      <ImgContainer className='w-full' src={planFooterImg} alt={''} />
      
    </div>
  )
}

export default Plans
