import Title2 from '@/components/my/Title2'
import GoogleLoginComponent from '../../login/layouts/GoogleLoginComponent'
import Parr from '@/components/my/Parr'
import { caAccount, logText } from '@/data/text'
import { Button } from '@/components/ui/button'
import FormCreateAccount from '../components/FormCreateAccount'
// import FacebookLoginComponent from '../../login/layouts/FacebookLoginComponent'
// import FormCreateAccount from '../components/FormCreateAccount'

function CreateAccount() {
  return (
    <div className='flex gap-2 flex-col w-80'>
      <Title2 className='mb-2'>{caAccount.title1}</Title2>
      <Parr className='text-parr_color_1 mb-2'>{logText.parr1}</Parr>

      <div className='flex justify-center items-center gap-8 mb-3'>
        <GoogleLoginComponent />
        <Button>F</Button>
        {/* <FacebookLoginComponent /> */}
      </div>
      <div className='flex items-center justify-center gap-3 mt-2 mb-2'>
        <span className='flex-1  h-0.5 w-full block bg-extra_1 rounded-sm'></span>
        <Parr className='flex text-ph_color_1'>{logText.other}</Parr>
        <span className='flex-1 h-0.5 w-full block bg-extra_1 rounded-sm'></span>
      </div>
      <FormCreateAccount />
    </div>
  )
}

export default CreateAccount
