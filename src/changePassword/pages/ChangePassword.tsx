import FormChangePassword from '../layouts/FormChangePassword'
import Title2 from '@/components/my/Title2'
import { repasText } from '@/data/text'

function ChangePassword() {
  return (
    < >
      <Title2>{repasText.title}</Title2>
      {/* <Parr className='text-parr_color_1 mb-2'>{repasText.parr1}</Parr> */}
      <FormChangePassword />
    </>
  )
}

export default ChangePassword
