import Logo from '@/components/my/Logo'
import MyCard from '@/components/my/MyCard'
import Parr from '@/components/my/Parr'
import Title2 from '@/components/my/Title2'
import { caAccount } from '@/data/text'

function VerifyAccount() {
  return (
    <MyCard>
      <Logo />
      <Title2>{caAccount.title2}</Title2>
      <Parr className='text-parr_color_1'>{caAccount.parr1}</Parr>
    </MyCard>
  )
}

export default VerifyAccount
