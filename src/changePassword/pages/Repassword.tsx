import Parr from '@/components/my/Parr'
import FormRepassword from '../layouts/FormRepassword'
import { repasText } from '@/data/text'
import Title2 from '@/components/my/Title2'
function Repassword() {
  return (
    <>
      <Title2>{repasText.title}</Title2>
      <Parr className='text-parr_color_1'>{repasText.parr1}</Parr>
      <FormRepassword />
    </>
  )
}

export default Repassword
