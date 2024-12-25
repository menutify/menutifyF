import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import bannerImg from '@/assets/login/right-side-image.png'
import ImgContainer from './Components/my/ImgContainer'
import Plans from './createAccount/components/Plans'

function AuthLayout() {
  const location = useLocation()
  // bg-bg_color_1
  return (
    <div className='relative flex w-full  min-h-screen  '>
      <section className='flex-1 w-full min-w-[320px] py-[30px] flex-complete bg-bg_color_1 flex-col text-white'>
        <div className='w-[90%] max-w-[400px] flex-complete flex-col gap-my_gap_1 '>
          <Outlet />
        </div>
      </section>
      <section className='w-[60%] hidden md:flex relative  justify-center items-center bg-white min-h-screen'>
        {location.pathname != '/create-account/payment' ? (
          <ImgContainer
            src={bannerImg}
            className='absolute h-full w-full top-0 right-0 inset-0'
            imgClassName='object-center'
          />
        ) : (
          <Plans />
        )}
      </section>
    </div>
  )
}

export default AuthLayout
