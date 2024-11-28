import { useEffect } from 'react'
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

function Payment() {
  const navigate = useNavigate()
  const { setUser } = useDataGlobalContext()
  useEffect(() => {
    // console.log('payment')
    // setUser({})
    // callAPI.getData(routesApi.logout).then((e) => navigate(routesPath.login))
    // VerifyTokenExist(routesPath.login, navigate)
  }, [])

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
    <>
      <Title2 className=''>{caPayment.title1}</Title2>
      <Parr className='text-parr_color_1'>{caPayment.parr1}</Parr>

      <ProgressBar state={2} />

      <FormPayment />

      <Button onClick={logOut} className='bg-ph_color_1 font-medium'>
        Cerrar sesión
      </Button>
    </>
  )
}

export default Payment
