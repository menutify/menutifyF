import FormLogin from '../layouts/FormLogin'
import { logText } from '@/data/text'
import GoogleAndFaceSession from '../layouts/GoogleAndFaceSession'
import Separator from '@/Components/my/Separator'
import MyCard from '@/Components/my/MyCard'
import logoSVG from '@/assets/logo2.svg'
import ImgContainer from '@/Components/my/ImgContainer'
import Title1 from '@/Components/my/Title1'
import Parr1 from '@/Components/my/Parr1'
import Anchor1 from '@/Components/my/Anchor1'
import { routesPath } from '@/data/routes'

const Login = () => {
  return (
    <MyCard className='items-start'>
      <ImgContainer src={logoSVG} className='h-10 w-10 mb-[20px]' />
      <div className='flex flex-col justify-center items-start gap-[10px]'>
        <Title1>{logText.title}</Title1>
        <Parr1 className='text-parr_color_1'>
          ¿Nuevo en Menutify?{' '}
          <Anchor1 className='text-primary_color' to={routesPath.createAccount}>{logText.regis}</Anchor1>
        </Parr1>
      </div>

      <FormLogin />

      <Separator text={logText.other} className='mb-[10px] my-[5px] ' />
      <GoogleAndFaceSession className={''} />
      {/* <div className='flex flex-col gap-my_gap_1 mt-1'>
        <Link
          className='text-parr_color_2 text-base'
          to={routesPath.repassword}
        >
          {logText.repass}
        </Link>
        <p className='text-parr_color_3 text-base'>
          {logText.noacc}{' '}
          <Link
            className='text-parr_color_2 text-base'
            to={routesPath.createAccount}
          >
            {logText.regis}
          </Link>
        </p>
      </div> */}
    </MyCard>
  )
}

export default Login
