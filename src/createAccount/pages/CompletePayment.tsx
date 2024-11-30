import Logo from '@/components/my/Logo'
import MyCard from '@/components/my/MyCard'
import Parr from '@/components/my/Parr'
import ProgressBar from '@/components/my/ProgressBar'
import Title2 from '@/components/my/Title2'
import { Button } from '@/components/ui/button'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import { routesApi, routesPath } from '@/data/routes'
import { caPayment } from '@/data/text'
import callAPI from '@/utils/callApi'
import HandleFormSubmit from '@/utils/handleForSubmit'

import { useNavigate } from 'react-router-dom'

function CompletePayment() {
  const navigate = useNavigate()
  const { setUser, user } = useDataGlobalContext()

  const logOut = async () => {
    setUser({
      id: null,
      isNew: null,
      email: null,
      subActive: null
    })
    await callAPI.getData(routesApi.logout)
    navigate(routesPath.login)
  }

  const { handleSubmit, error, isPending } = HandleFormSubmit()
  const moveToHome = async () => {
    const data = await handleSubmit(routesApi.caComplete, { id: user.id })

    if (!data) return

    navigate(routesPath.home)
  }

  return (
    <MyCard>
      <Logo />
      <Title2 className=''>{caPayment.title1}</Title2>
      <Parr className='text-parr_color_1'>{caPayment.parr1}</Parr>

      <ProgressBar state={3} className={'mt-2 mb-3'} />
      {error.error && <p className='error'>{error.msg}</p>}
      <Button
        onClick={moveToHome}
        className='bg-primary_color w-full h-9 mt-2'
        type='submit'
        disabled={isPending ? true : false}
      >
        {caPayment.button}
      </Button>
      <Button onClick={logOut} className='bg-ph_color_1 font-medium'>
        Cerrar sesión
      </Button>
    </MyCard>
  )
}

export default CompletePayment
