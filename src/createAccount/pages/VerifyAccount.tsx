import Parr from '@/components/my/Parr'
import Title2 from '@/components/my/Title2'
import { caAccount } from '@/data/text'

function VerifyAccount() {
  return (
    <div className='flex gap-2 flex-col w-80'>
      <Title2 className='mb-2'>{caAccount.title2}</Title2>
      <Parr className='text-parr_color_1 mb-2'>{caAccount.parr1}</Parr>
    </div>
  )
}

export default VerifyAccount
