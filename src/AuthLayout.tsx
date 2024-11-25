import { Outlet } from 'react-router-dom'
import logo from './assets/logo.svg'
function AuthLayout() {
  return (
    <div className='flex w-screen h-screen'>
      <div className='mr-auto absolute left-5 top-5'>
        <img src={logo} alt='' />
      </div>
      <section  className='p-2 top-10 flex-1 flex justify-center items-center flex-col bg-bg_color_1 text-white'>
        <div className='w-80 mb-4'>
          <i>🟥</i>
        </div>
        <div>
          {/* La parte izquierda cambiará dependiendo de la ruta */}

          <Outlet />
        </div>
      </section>
      <div className='w-2 bg-black flex justify-center items-center bg-white'>
        {/* Aquí puedes poner una imagen o ilustración */}
      </div>
    </div>
  )
}

export default AuthLayout
