import Title2 from '@/Components/my/Title2'
import Parr from '@/Components/my/Parr'
import { caAccount, logText } from '@/data/text'
import FormCreateAccount from '../components/FormCreateAccount'
import ProgressBar from '@/Components/my/ProgressBar'
import GoogleAndFaceSession from '@/login/layouts/GoogleAndFaceSession'
import Separator from '@/Components/my/Separator'
import MyCard from '@/Components/my/MyCard'
import Logo from '@/Components/my/Logo'


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
