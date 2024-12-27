import Anchor1 from '@/Components/my/Anchor1'
import ImgContainer from '@/Components/my/ImgContainer'
import MyCard from '@/Components/my/MyCard'
import Parr1 from '@/Components/my/Parr1'
import Title1 from '@/Components/my/Title1'
import { routesPath } from '@/data/routes'
import { repasText } from '@/data/text'
import LogoSvg from '@/assets/login/email-icon.svg'

function SendEmail() {
  return (
    <MyCard className='items-start'>
      <ImgContainer src={LogoSvg} className='h-10 w-10' />
      <Title1>{repasText.title2}</Title1>
      <Parr1 className='text-parr_color_1 spacing'>{repasText.parr2}</Parr1>
      <Anchor1
        className='text-primary_color text-md underline'
        style={{ fontWeight: '400' }}
        to={routesPath.repassword}
      >
        ¿Te equivocaste de email? &gt;
      </Anchor1>
      <p
        className='text-primary_color text-md font-thin underline text-center tracking-wider cursor-pointer'
        style={{ fontWeight: '400' }}
      >
        Re-enviar mail de confirmación &gt;
      </p>
    </MyCard>
  )
}

export default SendEmail
