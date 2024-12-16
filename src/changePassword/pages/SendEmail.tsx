import Logo from '@/Components/my/Logo'
import MyCard from '@/Components/my/MyCard'
import Parr from '@/Components/my/Parr'
import Title2 from '@/Components/my/Title2'
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
