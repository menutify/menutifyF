import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FormPayment from '../components/FormPayment'

import '../styles/Payment.scss'
import callAPI from '../../utils/callApi'
import { routesApi, routesPath } from '../../data/routesPath'
import { useDataGlobalContext } from '../../Context/GlobalContext'

function Payment() {
  const navigate = useNavigate()
  const { setUser } = useDataGlobalContext()
  useEffect(() => {
    console.log('payment')
    // VerifyTokenExist(routesPath.login, navigate)
  }, [])

  const deleteCookie = async () => {
    setUser({})
    await callAPI.getData(routesApi.logout)
    navigate(routesPath.login)
  }

  return (
    <div className='ca_pay_container div_container ca_container'>
      <p className='ico_menutify'>
        <i>🟥🟥</i>MENUTIFY
      </p>
      <section className='ca_pay_section ca_pay_section1'>
        <div className='ca_pay_section1-cont'>
          <div className='ca_pay_section1-ico'>
            <i>🟥</i>
          </div>
          <h3>Account Information</h3>
          <p>
            This information will help us ensure a smooth and personalized
            experience for you
          </p>
          <div>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <FormPayment />
        </div>
      </section>
      <section className='ca_pay_section ca_pay_section2'></section>
      <button onClick={deleteCookie}>LOGOUT</button>
    </div>
  )
}

export default Payment
