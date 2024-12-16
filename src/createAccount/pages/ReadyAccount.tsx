import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import HandleFormSubmit from '../../utils/handleForSubmit'
import { routesApi, routesPath } from '../../data/routes'
import { useDataGlobalContext } from '../../Context/GlobalContext'
import { User } from '@/types'
import { Button } from '@/Components/ui/button'
import { caAccount } from '@/data/text'
import Title2 from '@/Components/my/Title2'
import Parr from '@/Components/my/Parr'
import Logo from '@/Components/my/Logo'
import MyCard from '@/Components/my/MyCard'

function ReadyAccount() {
  const navigate = useNavigate()
  const { token } = useParams()
  const { setUser } = useDataGlobalContext()
  const [fail, setFail] = useState(false)
  const { error, handleSubmit, isPending } = HandleFormSubmit()

  useEffect(() => {
    handleSubmit(routesApi.caCreate, {}, { Authorization: token as string })
      .then((data) => {
        if (!data) {
          setFail(true)
          return
        }
        console.log(data)
        setUser(data as User)
      })
      .catch(() => {
        console.error('Error en el inicio de sesión:')
        setFail(true)
        return
      })
  }, [])

  const routeNavigate = () => {
    navigate(fail ? routesPath.login : routesPath.caPayment, { replace: true })
  }

  return (
    <MyCard>
      <Logo />
      <Title2 className=''>
        {fail ? caAccount.title4 : caAccount.title3}
      </Title2>
      <Parr className='text-parr_color_1'>
        {fail ? caAccount.parr3 : caAccount.parr2}
      </Parr>
      <Button
        onClick={routeNavigate}
        className='bg-primary_color mt-2'
        disabled={isPending ? true : false}
      >
        {caAccount.button2}
      </Button >
      {error.error ? <p className='error'>{error.msg}</p>:<></>}
      {/* <button onClick={logOut}>Cerrar sesion</button> */}
    </MyCard>
  )
}

export default ReadyAccount
