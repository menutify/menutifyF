import { Outlet } from 'react-router-dom'
import logo from './assets/logo.svg'
import MyCarrousel from './components/my/MyCarrousel'

function AuthLayout() {
  
// bg-bg_color_1
  return (
    
    <div className='relative flex w-full max-w-[1920px] min-h-screen  '>
      <div className='absolute  left-[6%] top-[2.5%] md:left-[2.5%] md:top-[5%] '>
        <img
          className='scale-90 md:scale-125 origin-top-left'
          src={logo}
          alt=''
        />
      </div>
      <section className='w-full min-w-[320px] max-h-600:pt-[10%]  flex-complete bg-bg_color_1 flex-col text-white'>
        <div className=' my-[5%] w-[90%] max-w-[400px] flex-complete flex-col gap-my_gap_1 '>
          <Outlet />
        </div>
      </section>
      <section className='hidden md:flex w-full relative   justify-center items-center  bg-white '>
        <MyCarrousel />
       
        
      </section>
    </div>
  )
}

export default AuthLayout
