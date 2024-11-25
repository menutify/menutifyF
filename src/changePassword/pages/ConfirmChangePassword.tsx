import Parr from '@/components/my/Parr'
import Title2 from '@/components/my/Title2'
import { Button } from '@/components/ui/button'
import { routesPath } from '@/data/routes'
import { repasText } from '@/data/text'
import { useNavigate } from 'react-router-dom'

function ConfirmChangePassword() {
  const navigate = useNavigate()

  const moveTo = () => {
    navigate(routesPath.login, { replace: true })
  }

  return (
    <div className='flex gap-2 flex-col w-80'>
      <Title2 className='mb-2'>{repasText.title3}</Title2>
      <Parr className='text-parr_color_1 mb-2'>{repasText.parr3}</Parr>
      <Button
        onClick={moveTo}
        className='bg-button_color_1 w-full h-9 '
        type='submit'
      >
        {repasText.button2}
      </Button>
    </div>
  )
}

export default ConfirmChangePassword
