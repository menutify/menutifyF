import Parr from '@/components/my/Parr'
import Title2 from '@/components/my/Title2'
import { repasText } from '@/data/text'

function SendEmail() {
  return (
    <div className='flex gap-2 flex-col w-80'>
      <Title2 className='mb-2'>{repasText.title2}</Title2>
      <Parr className='text-parr_color_1 mb-2'>{repasText.parr2}</Parr>
    </div>
  )
}

export default SendEmail
