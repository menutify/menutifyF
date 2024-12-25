import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import HandleFormSubmit from '../../utils/handleForSubmit'
import { routesApi, routesPath } from '../../data/routes'
import { useDataGlobalContext } from '../../Context/GlobalContext'
import { User } from '@/types'
import { Button } from '@/Components/ui/button'
import { caAccount } from '@/data/text'
import confirmSVG from '@/assets/login/move-forward-icon.svg'
import MyCard from '@/Components/my/MyCard'
import ImgContainer from '@/Components/my/ImgContainer'
import Title1 from '@/Components/my/Title1'
import Parr1 from '@/Components/my/Parr1'

function ReadyAccount() {
  const navigate = useNavigate()
  const { token } = useParams()
  const { setUser } = useDataGlobalContext()
  const [fail, setFail] = useState(false)
  const { error, handleSubmit, isPending } = HandleFormSubmit()

  useEffect(() => {
    const handleSubmitPost = async () => {
      const data = await handleSubmit(
        routesApi.caCreate,
        {},
        { Authorization: token as string }
      )
      if (!data) {
        setFail(true)
        return
      }
      console.log(data)
      setUser(data as User)
    }

    handleSubmitPost()
  }, [])

  const routeNavigate = () => {
    navigate(fail ? routesPath.login : routesPath.caPayment, { replace: true })
  }

  return (
    <MyCard>
      <ImgContainer src={confirmSVG} className='h-8 w-8' />
      <Title1>{fail ? caAccount.title4 : caAccount.title3}</Title1>
      <Parr1 className='text-parr_color_1 spacing'>
        {fail ? caAccount.parr3 : caAccount.parr2}
      </Parr1>

      <Button
        onClick={routeNavigate}
        className='bg-primary_color mt-2'
        disabled={isPending ? true : false}
      >
        {fail ? caAccount.button3 : caAccount.button2}
      </Button>
      {error.error ? <p className='error'>{error.msg}</p> : <></>}
      {/* <button onClick={logOut}>Cerrar sesion</button> */}
    </MyCard>
  )
}

export default ReadyAccount
