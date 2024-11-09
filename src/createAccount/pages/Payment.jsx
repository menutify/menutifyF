import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FormPayment from '../../payment/layouts/FormPayment'
import VerifyTokenExist from '../../utils/VerifyTokenExist'
import routesPath from '../../data/routesPath'
import '../styles/Payment.scss'

function Payment({ stripePromise }) {
  const navigate = useNavigate()

  useEffect(() => {
    console.log('payment')
    VerifyTokenExist(routesPath.login, navigate)
  }, [])

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
          <FormPayment stripePromise={stripePromise} />
        </div>
      </section>
      <section className='ca_pay_section ca_pay_section2'></section>
    </div>
  )
}

export default Payment
