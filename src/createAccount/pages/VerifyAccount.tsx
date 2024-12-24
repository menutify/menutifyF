import ImgContainer from '@/Components/my/ImgContainer'
import LogoSvg from '@/assets/login/email-icon.svg'
import MyCard from '@/Components/my/MyCard'
import Parr from '@/Components/my/Parr'
import { caAccount } from '@/data/text'
import Title1 from '@/Components/my/Title1'
import Anchor1 from '@/Components/my/Anchor1'
import { routesPath } from '@/data/routes'

function VerifyAccount() {
  return (
    <MyCard className='items-start'>
      <ImgContainer src={LogoSvg} className='h-10 w-10' />
      <Title1>{caAccount.title2}</Title1>
      <Parr className='text-parr_color_1 spacing'>{caAccount.parr1}</Parr>
      <Anchor1
        className='text-primary_color text-xl underline'
        style={{ fontWeight: '400' }}
        to={routesPath.createAccount}
      >
        ¿Te equivocaste de email? &gt;
      </Anchor1>
      <p
        className='text-primary_color text-xl font-thin underline text-center tracking-wider cursor-pointer'
        style={{ fontWeight: '400' }}
      >
        Re-enviar mail de confirmación &gt;
      </p>
    </MyCard>
  )
}

export default VerifyAccount
