import MyCard from '@/Components/my/MyCard'
import FormChangePassword from '../layouts/FormChangePassword'
import { repasText } from '@/data/text'
import ImgContainer from '@/Components/my/ImgContainer'
import LogoSvg from '@/assets/login/password.svg'
import Title1 from '@/Components/my/Title1'

function ChangePassword() {
  return (
    <MyCard>
      <ImgContainer src={LogoSvg} className='h-10 w-10' />
      <Title1>{repasText.title}</Title1>
      {/* <Parr1 className='text-parr_color_1 mb-2'> </Parr1> */}
      <FormChangePassword />
    </MyCard>
  )
}

export default ChangePassword
