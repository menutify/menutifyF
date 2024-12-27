import ImgContainer from '@/Components/my/ImgContainer'
import MyCard from '@/Components/my/MyCard'
import Title2 from '@/Components/my/Title2'
import { Button } from '@/Components/ui/button'
import { routesPath } from '@/data/routes'
import { repasText } from '@/data/text'
import { useNavigate } from 'react-router-dom'
import confirmSVG from '@/assets/login/move-forward-icon.svg'
import Parr1 from '@/Components/my/Parr1'

function ConfirmChangePassword() {
  const navigate = useNavigate()

  const moveTo = () => {
    navigate(routesPath.login, { replace: true })
  }

  return (
    <MyCard>
      <ImgContainer src={confirmSVG} className='h-8 w-8' />
      <Title2 className=''>{repasText.title3}</Title2>
      <Parr1 className='text-parr_color_1'>{repasText.parr3}</Parr1>
      <Button onClick={moveTo} className='bg-primary_color'>
        {repasText.button2}
      </Button>
    </MyCard>
  )
}

export default ConfirmChangePassword
