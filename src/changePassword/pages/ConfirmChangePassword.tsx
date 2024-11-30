import Logo from '@/components/my/Logo'
import MyCard from '@/components/my/MyCard'
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
    <MyCard>
      <Logo />
      <Title2 className=''>{repasText.title3}</Title2>
      <Parr className='text-parr_color_1'>{repasText.parr3}</Parr>
      <Button onClick={moveTo} className='bg-primary_color'>
        {repasText.button2}
      </Button>
    </MyCard>
  )
}

export default ConfirmChangePassword
