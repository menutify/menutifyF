import Title2 from '@/components/my/Title2'
import GoogleLoginComponent from '../../login/layouts/GoogleLoginComponent'
import Parr from '@/components/my/Parr'
import { caAccount, logText } from '@/data/text'
import { Button } from '@/components/ui/button'
import FormCreateAccount from '../components/FormCreateAccount'
import ProgressBar from '@/components/my/ProgressBar'
import GoogleAndFaceSession from '@/login/layouts/GoogleAndFaceSession'
import Separator from '@/components/my/Separator'
// import FacebookLoginComponent from '../../login/layouts/FacebookLoginComponent'
// import FormCreateAccount from '../components/FormCreateAccount'

function CreateAccount() {
  return (
    <div className='flex-1 flex gap-3 flex-col h-full items-center'>
    <div className='flex gap-3 flex-col '>

      <Title2 className=''>{caAccount.title1}</Title2>
      <Parr className='text-parr_color_1 '>{logText.parr1}</Parr>
      <ProgressBar state={1} />
      <GoogleAndFaceSession />
      <Separator text={logText.other}/>
    </div >

      <FormCreateAccount />
    </div>
  )
}

export default CreateAccount
