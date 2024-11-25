import Parr from '@/components/my/Parr'
import FormRepassword from '../layouts/FormRepassword'
import { repasText } from '@/data/text'
import Title2 from '@/components/my/Title2'
function Repassword() {
  return (
    <div className='flex gap-2 flex-col w-80'>
      <Title2 className='mb-2'>{repasText.title}</Title2>
      <Parr className='text-parr_color_1 mb-2'>{repasText.parr1}</Parr>
      <FormRepassword />
    </div>
  )
}

export default Repassword
