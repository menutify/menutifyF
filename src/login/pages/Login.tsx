import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import GoogleLoginComponent from '../layouts/GoogleLoginComponent'
// import FacebookLoginComponent from '../layouts/FacebookLoginComponent'
import logo from '../../assets/logo.svg'
import FormLogin from '../layouts/FormLogin'
import { routesPath } from '../../data/routes'
import Parr from '@/components/my/Parr'
import Title2 from '@/components/my/Title2'
import { logText } from '@/data/text'
import { Button } from '@/components/ui/button'

const Login = () => {
  useEffect(() => {
    console.log('login')
    // googleLogout()
  }, [])

  return (
    <div className='flex gap-2 flex-col w-80'>
      
      <Title2 className='mb-2'>{logText.title}</Title2>
      <Parr className='text-parr_color_1 mb-2'>{logText.parr1}</Parr>
      <FormLogin />
      <div className='flex items-center justify-center gap-3 mt-2 mb-2'>
        <span className='flex-1  h-0.5 w-full block bg-extra_1 rounded-sm'></span>
        <Parr className='flex text-ph_color_1'>{logText.other}</Parr>
        <span className='flex-1 h-0.5 w-full block bg-extra_1 rounded-sm'></span>
      </div>
      <div className='flex justify-center items-center gap-8 mb-3'>
        <GoogleLoginComponent />
        <Button>
        F
        </Button>
        {/* <FacebookLoginComponent /> */}
      </div>
      <Link className='text-parr_color_2' to={routesPath.repassword}>{logText.repass}</Link>
      <p  className='text-parr_color_3'>
        {logText.noacc}{' '}
        <Link className='text-parr_color_2' to={routesPath.createAccount}>{logText.regis}</Link>
      </p>
    </div>
  )
}

export default Login
