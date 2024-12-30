import ImgContainer from '@/Components/my/ImgContainer'
import LogoSvg from '@/assets/login/email-icon.svg'
import MyCard from '@/Components/my/MyCard'
import { caAccount } from '@/data/text'
import Title1 from '@/Components/my/Title1'
import Anchor1 from '@/Components/my/Anchor1'
import { routesApi, routesPath } from '@/data/routes'
import Parr1 from '@/Components/my/Parr1'
import { useEffect, useState } from 'react'
import HandleFormSubmit from '@/utils/handleForSubmit'
import { useDataGlobalContext } from '@/Context/GlobalContext'

function VerifyAccount() {
  const [countdown, setCountdown] = useState(59)
  const { handleSubmit } = HandleFormSubmit()
  const { perfil } = useDataGlobalContext()
  useEffect(() => {
    let timer

    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [countdown])

  const sendNewEmail = async () => {
    const resp = await handleSubmit(routesApi.verifyAccount, perfil)
    setCountdown(59)
    if (!resp) return
  }

  return (
    <MyCard className='items-start'>
      <ImgContainer src={LogoSvg} className='h-10 w-10' />
      <Title1>{caAccount.title2}</Title1>
      <Parr1 className='text-parr_color_1 spacing'>{caAccount.parr1}</Parr1>
      <Anchor1
        className='text-primary_color text-md underline'
        style={{ fontWeight: '400' }}
        to={routesPath.createAccount}
      >
        ¿Te equivocaste de email? &gt;
      </Anchor1>
      <button
        className={` text-sm font-thin underline text-center tracking-wider  p-0 ${
          countdown != 0
            ? 'text-[#aa3202] cursor-not-allowed'
            : 'text-primary_color cursor-pointer'
        }`}
        style={{ fontWeight: '400' }}
        disabled={countdown == 0 ? false : true}
        onClick={sendNewEmail}
      >
        Re-enviar mail de confirmación &gt;{' '}
        {countdown != 0 &&
          '00:' + (countdown > 9 ? countdown : '0' + countdown)}
      </button>
    </MyCard>
  )
}

export default VerifyAccount
