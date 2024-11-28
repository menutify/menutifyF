import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import FormLogin from '../layouts/FormLogin'
import { routesPath } from '../../data/routes'
import Parr from '@/components/my/Parr'
import Title2 from '@/components/my/Title2'
import { logText } from '@/data/text'
import GoogleAndFaceSession from '../layouts/GoogleAndFaceSession'
import Separator from '@/components/my/Separator'

const Login = () => {
  useEffect(() => {
    console.log('login')
    // googleLogout()
  }, [])

  return (
    <>
      <Title2 className=''>{logText.title}</Title2>
      <Parr className='text-parr_color_1 '>{logText.parr1}</Parr>
      <FormLogin /> 
      <Separator text={logText.other} />
      <GoogleAndFaceSession />
      <Link className='text-parr_color_2' to={routesPath.repassword}>
        {logText.repass}
      </Link>
      <p className='text-parr_color_3'>
        {logText.noacc}{' '}
        <Link className='text-parr_color_2' to={routesPath.createAccount}>
          {logText.regis}
        </Link>
      </p>
    </>
  )
}

export default Login
