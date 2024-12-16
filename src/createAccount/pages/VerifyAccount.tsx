import Logo from '@/Components/my/Logo'
import MyCard from '@/Components/my/MyCard'
import Parr from '@/Components/my/Parr'
import Title2 from '@/Components/my/Title2'
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
