import FormRepassword from '../layouts/FormRepassword'
import { repasText } from '@/data/text'
import MyCard from '@/Components/my/MyCard'
import ImgContainer from '@/Components/my/ImgContainer'
import Title1 from '@/Components/my/Title1'
import Parr1 from '@/Components/my/Parr1'
import LogoSvg from '@/assets/login/password.svg'

function Repassword() {
  return (
    <MyCard>
      <ImgContainer src={LogoSvg} className='h-10 w-10' />
      <Title1>{repasText.title}</Title1>
      <Parr1 className='text-parr_color_1'>{repasText.parr1}</Parr1>
      <FormRepassword />
    </MyCard>
  )
}

export default Repassword
