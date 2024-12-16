import Parr from '@/Components/my/Parr'
import FormRepassword from '../layouts/FormRepassword'
import { repasText } from '@/data/text'
import Title2 from '@/Components/my/Title2'
import MyCard from '@/Components/my/MyCard'
import Logo from '@/Components/my/Logo'
function Repassword() {
  return (
    <MyCard>
      <Logo />
      <Title2>{repasText.title}</Title2>
      <Parr className='text-parr_color_1'>{repasText.parr1}</Parr>
      <FormRepassword />
    </MyCard>
  )
}

export default Repassword
