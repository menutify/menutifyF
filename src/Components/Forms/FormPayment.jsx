import { useEffect, useState } from 'react'

//manejador de datos
import useHandleData from '../../hooks/useHandleData'
//Elementos de html
import Options from '../Options'
import TextInput from '../Inputs/TextInput'
import NumberInput from '../Inputs/NumberInput'
//Data iterable
import phoneCodes from '../../data/phoneCodes'
//ImageneS:
import argflag from '../../img/createAccount/arFlag.svg'
import earth from '../../img/createAccount/earth.svg'

//Stripe:

import { Elements } from '@stripe/react-stripe-js'
import { obtainCustomerId } from '../../helpers/stripeHelpers'
import { styleFormStripeSub,styleFormStripe } from '../../style/styleFormStripe'
import FormStripe from './FormStripe'
import FormStripeSubscription from './FormStripeSubscription'

const defaultValueForm = {
  name: '',
  code: '',
  phone: '',
  emoji: ''
}

function FormPayment({ stripePromise }) {
  const [data, handleDataForm] = useHandleData(defaultValueForm)
  const [selectedOption, setSelectedOption] = useState(true)
  const [clientIdStripe, setClientIdStripe] = useState('')
  // const [stripePromise, setStripePromise] = useState(null)

  useEffect(() => {
    console.log('FormPayment')
    // obtener clave publica para activar stripe
    // fetch('http://localhost:3000/api/pay/config').then(async (r) => {
    //   const data = await r.json()
    //   const promise = await loadStripe(data.publishableKey)
    //   setStripePromise(promise)
    // })
  }, [])

  useEffect(() => {
    if (selectedOption) return

    setClientIdStripe(localStorage.getItem('clientId'))
    if (!localStorage.getItem('clientId')) {
      console.log('creando clientId')
      // obtener el id custom
      obtainCustomerId().then((e) => {
        localStorage.setItem('clientId', e)
        setClientIdStripe(e)
      })
      return
    }

    console.log('ya existe clientId')
  }, [selectedOption])

  const handleOptionChange = () => {
    setSelectedOption(!selectedOption)
  }

  return (
    <>
      <div className='radio-group'>
        <div
          className={`radio-item ${
            selectedOption === true && 'radio-item-selected'
          }`}
        >
          <input
            type='radio'
            id='option1'
            name='selection'
            value='option1'
            checked={selectedOption === true}
            onChange={handleOptionChange}
          />
          <label htmlFor='option1'>
            <div>
              <img src={argflag} alt='' />
            </div>

            <p>Argentina</p>
          </label>
        </div>
        <div
          className={`radio-item ${
            selectedOption === false && 'radio-item-selected'
          }`}
        >
          <input
            type='radio'
            id='option2'
            name='selection'
            value='option2'
            checked={selectedOption === false}
            onChange={handleOptionChange}
          />
          <label htmlFor='option2'>
            <div>
              <img src={earth} alt='' />
            </div>

            <p>Otros</p>
          </label>
        </div>
      </div>
      <div className='form-pay-cont'>
        <p>
          <span>Menutify</span> is currently available in selected countries,
          but we are excited to announce that it will soon be accessible
          worldwide. Stay tuned for updates!
        </p>

        <TextInput
          name={'name'}
          data={data.name}
          setData={handleDataForm}
          placeholder='Name and Last name'
          pattern='[A-Za-z\s]+'
        />
        <div className='form-pay-number'>
          <div>
            <img src={data.emoji} alt='' />
          </div>
          <select
            className='select'
            name='code'
            onChange={handleDataForm}
            defaultValue='code'
          >
            <option value='code' disabled>
              +00
            </option>
            {phoneCodes.map((info, i) => (
              <Options
                key={info.code + i}
                id={info.code}
                value={info.dial_code}
                text={`${info.dial_code}`}
                emoji={info.emoji}
              />
            ))}
          </select>
          <NumberInput
            name='phone'
            data={data.phone}
            setData={handleDataForm}
          />
        </div>
        <div>
          {selectedOption ? (
            <>
              <>mercadoPago</>
              <Elements stripe={stripePromise} options={styleFormStripeSub}>
                <FormStripeSubscription data={data || {}} clientId={clientIdStripe} />
              </Elements>
            </>
          ) : (
            <Elements stripe={stripePromise} options={styleFormStripe}>
              <FormStripe data={data || {}} clientId={clientIdStripe} />
            </Elements>
          )}
        </div>
      </div>
    </>
  )
}

export default FormPayment
