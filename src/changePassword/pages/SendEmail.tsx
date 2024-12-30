import Anchor1 from '@/Components/my/Anchor1'
import ImgContainer from '@/Components/my/ImgContainer'
import MyCard from '@/Components/my/MyCard'
import Parr1 from '@/Components/my/Parr1'
import Title1 from '@/Components/my/Title1'
import { routesApi, routesPath } from '@/data/routes'
import { repasText } from '@/data/text'
import LogoSvg from '@/assets/login/email-icon.svg'
import { useEffect, useState } from 'react'
import HandleFormSubmit from '@/utils/handleForSubmit'

function SendEmail() {
  const [countdown, setCountdown] = useState(59)
  const { handleSubmit } = HandleFormSubmit()
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
    const resp = await handleSubmit(routesApi.sendEmail, {
      email: localStorage.getItem('emailRe')
    })
    setCountdown(59)
    if (!resp) return
  }
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
      <button
        className={` text-sm font-thin underline text-center tracking-wider p-0 ${
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

export default SendEmail
