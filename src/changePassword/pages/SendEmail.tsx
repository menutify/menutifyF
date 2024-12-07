import Logo from '@/components/my/Logo'
import MyCard from '@/components/my/MyCard'
import Parr from '@/components/my/Parr'
import Title2 from '@/components/my/Title2'
import { repasText } from '@/data/text'

function SendEmail() {
  return (
    <MyCard>
      <Logo />
      <Title2 className=''>{repasText.title2}</Title2>
      <Parr className='text-parr_color_1'>{repasText.parr2}</Parr>
    </MyCard>
  )
}

export default SendEmail
