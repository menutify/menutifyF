import MyCard from '@/components/my/MyCard'
import FormChangePassword from '../layouts/FormChangePassword'
import Title2 from '@/components/my/Title2'
import { repasText } from '@/data/text'
import Logo from '@/components/my/Logo'

function ChangePassword() {
  return (
    <MyCard>
      <Logo />
      <Title2>{repasText.title}</Title2>
      {/* <Parr className='text-parr_color_1 mb-2'>{repasText.parr1}</Parr> */}
      <FormChangePassword />
    </MyCard>
  )
}

export default ChangePassword
