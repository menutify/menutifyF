import './Payment.css'
import FormPayment from '../Components/Forms/FormPayment'
import { useEffect } from 'react'
import VerifyTokenExist from '../helpers/VerifyTokenExist'
import routesPath from '../data/routesPath'
import { useNavigate } from 'react-router-dom'

function Payment() {
  const navigate = useNavigate()


  useEffect(() => {
    console.log('payment')
    VerifyTokenExist(routesPath.login,navigate)
  }, [])

  return (
    <div className='container'>
      <FormPayment />
    </div>
  )
}

export default Payment
