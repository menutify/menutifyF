import { Outlet } from 'react-router-dom'
import logo from './assets/logo.svg'
import logo2 from './assets/logo2.svg'
function AuthLayout() {
  return (
    <div className='flex w-screen h-screen bg-bg_color_1 overflow-auto'>
      <div className='mr-auto absolute left-5 top-5'>
        <img src={logo} alt='' />
      </div>
      <section className='flex-1 flex justify-center  items-center bg-bg_color_1 flex-col text-white max-h-680:justify-start max-h-680:pt-20'>
        <div className='min-w-80 w-80 pl-3 pr-3 flex flex-col justify-center items-center gap-3 min-h-[560px] max-h-680:justify-start '>
          <div className='w-full '>
            <img src={logo2} alt='' />
          </div>
          <div className='flex gap-3 flex-col w-full'>
            <Outlet />
          </div>
        </div>
      </section>
      <section className='w-2 flex-1 justify-center items-center bg-white'>
        {/* Aquí puedes poner una imagen o ilustración */}
      </section>
    </div>
  )
}

export default AuthLayout
