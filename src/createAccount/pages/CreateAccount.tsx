
import { logText } from '@/data/text'
import FormCreateAccount from '../components/FormCreateAccount'
import ProgressBar from '@/Components/my/ProgressBar'
import GoogleAndFaceSession from '@/login/layouts/GoogleAndFaceSession'
import Separator from '@/Components/my/Separator'
import MyCard from '@/Components/my/MyCard'

import Title1 from '@/Components/my/Title1'
import Parr1 from '@/Components/my/Parr1'

function CreateAccount() {
  return (
    <MyCard className='items-start'>
      <Title1>¡Unite a Menutify hoy!</Title1>
      <div className='w-full'>
        <Parr1 className='text-parr_color_1'>{logText.parr1}</Parr1>
        <ProgressBar state={1} className={'mt-2 mb-3'} />
      </div>

      <GoogleAndFaceSession className={''} />
      <Separator text={logText.other} className='mt-2 mb-1' />
      <FormCreateAccount />
    </MyCard>
  )
}

export default CreateAccount
