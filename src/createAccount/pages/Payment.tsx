import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import FormPayment from '../components/FormPayment'

import callAPI from '../../utils/callApi'
import { routesApi, routesPath } from '../../data/routes'
import { useDataGlobalContext } from '../../Context/GlobalContext'
import { Button } from '@/components/ui/button'
import Title2 from '@/components/my/Title2'
import Parr from '@/components/my/Parr'
import { caPayment } from '@/data/text'
import ProgressBar from '@/components/my/ProgressBar'
import Logo from '@/components/my/Logo'
import MyCard from '@/components/my/MyCard'

function Payment() {
  const navigate = useNavigate()
  const { setUser } = useDataGlobalContext()

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

  return (
    <MyCard className='mt-20 overflow-x-hidden '>
      <span className='absolute top-20 left-40 text-white '>5287 3383 1025 3304	</span>
      
      <Logo />
      <Title2 className=''>{caPayment.title1}</Title2>
      <Parr className='text-parr_color_1'>{caPayment.parr1}</Parr>

      <ProgressBar state={2} className={'mt-2 mb-3'} />

      <FormPayment />

      <Button onClick={logOut} className='bg-ph_color_1 h-10'>
        Cerrar sesión
      </Button>
    </MyCard>
  )
}

export default Payment
