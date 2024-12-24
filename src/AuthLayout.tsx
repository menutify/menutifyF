import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import bannerImg from '@/assets/login/right-side-image.png'
import ImgContainer from './Components/my/ImgContainer'

function AuthLayout() {
  const location = useLocation()
  // bg-bg_color_1
  return (
    <div className='relative flex w-full  min-h-screen  '>
      <section className='flex-1 w-full min-w-[320px] max-h-600:pt-[10%]  flex-complete bg-bg_color_1 flex-col text-white'>
        <div className=' my-[5%] w-[90%] max-w-[400px] flex-complete flex-col gap-my_gap_1 '>
          <Outlet />
        </div>
      </section>
      <section className='w-[60%] hidden md:flex relative  justify-center items-center  bg-white '>
        {location.pathname != '/createAccount/Payment' ? (
          <ImgContainer src={bannerImg} className='h-full max-h-screen w-full'/>
        ) : (
          <h1>HOLA</h1>
        )}
      </section>
    </div>
  )
}

export default AuthLayout
