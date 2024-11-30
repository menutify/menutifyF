import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import FormLogin from '../layouts/FormLogin'
import { routesPath } from '../../data/routes'
import Parr from '@/components/my/Parr'
import Title2 from '@/components/my/Title2'
import { logText } from '@/data/text'
import GoogleAndFaceSession from '../layouts/GoogleAndFaceSession'
import Separator from '@/components/my/Separator'
import MyCard from '@/components/my/MyCard'
import Logo from '@/components/my/Logo'
import { useDataGlobalContext } from '@/Context/GlobalContext'

const Login = () => {
  return (
    <MyCard>
      <Logo />
      <Title2>{logText.title}</Title2>
      <Parr>{logText.parr1}</Parr>
      <FormLogin />
      <Separator text={logText.other} className='mt-3 mb-3' />
      <GoogleAndFaceSession className={'mb-1'} />
      <div className='flex flex-col gap-my_gap_1 mt-1'>
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
      </div>
    </MyCard>
  )
}

export default Login
