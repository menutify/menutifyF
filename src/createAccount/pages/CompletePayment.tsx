import Logo from '@/Components/my/Logo'
import MyCard from '@/Components/my/MyCard'
import Parr from '@/Components/my/Parr'
import ProgressBar from '@/Components/my/ProgressBar'
import Title2 from '@/Components/my/Title2'
import { Button } from '@/Components/ui/button'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import { routesApi, routesPath } from '@/data/routes'
import { caAccount } from '@/data/text'
import HandleFormSubmit from '@/utils/handleForSubmit'

import { useNavigate } from 'react-router-dom'

function CompletePayment() {
  const navigate = useNavigate()
  const { setUser, user } = useDataGlobalContext()

  const { handleSubmit, error, isPending } = HandleFormSubmit()
  const moveToDashboard = async () => {
    const data = await handleSubmit(routesApi.caComplete, { id: user.id })

    if (!data) return

    const { isNew, subActive } = data as { isNew: boolean; subActive: boolean }

    if (isNew == false && subActive == true) {
      setUser({ ...user, isNew, subActive })
      navigate(routesPath.dashboard)
      return
    }

    navigate(routesPath.login)
  }

  return (
    <MyCard>
      <Logo />
      <Title2 className=''>{caAccount.title5}</Title2>
      <Parr className='text-parr_color_1'>{caAccount.parr4}</Parr>
      <ProgressBar state={3} className={'mt-2 mb-3'} />
      {error.error ? <p className='error'>{error.msg}</p> : <></>}
      <Button
        onClick={moveToDashboard}
        className='bg-primary_color w-full h-9 mt-2'
        type='submit'
        disabled={isPending ? true : false}
      >
        {caAccount.button2}
      </Button>
    </MyCard>
  )
}

export default CompletePayment
