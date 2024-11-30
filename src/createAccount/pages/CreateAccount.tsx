import Title2 from '@/components/my/Title2'
import GoogleLoginComponent from '../../login/layouts/GoogleLoginComponent'
import Parr from '@/components/my/Parr'
import { caAccount, logText } from '@/data/text'
import { Button } from '@/components/ui/button'
import FormCreateAccount from '../components/FormCreateAccount'
import ProgressBar from '@/components/my/ProgressBar'
import GoogleAndFaceSession from '@/login/layouts/GoogleAndFaceSession'
import Separator from '@/components/my/Separator'
import MyCard from '@/components/my/MyCard'
import Logo from '@/components/my/Logo'
import { useEffect } from 'react'
import { useDataGlobalContext } from '@/Context/GlobalContext'
// import FacebookLoginComponent from '../../login/layouts/FacebookLoginComponent'
// import FormCreateAccount from '../components/FormCreateAccount'

function CreateAccount() {
  

  return (
    <MyCard>
      <Logo />
      <Title2 className=''>{caAccount.title1}</Title2>
      <Parr className='text-parr_color_1 '>{logText.parr1}</Parr>
      <ProgressBar state={1} className={'mt-2 mb-3'} />
      <GoogleAndFaceSession className={''} />
      <Separator text={logText.other} className='mt-2 mb-1' />
      <FormCreateAccount />
    </MyCard>
  )
}

export default CreateAccount
