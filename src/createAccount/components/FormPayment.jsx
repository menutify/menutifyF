import { useEffect, useState } from 'react'

//manejador de datos
import useHandleData from '../../hooks/useHandleData'
//Elementos de html
import Options from '../../Components/Options'
import TextInput from '../../Components/Inputs/TextInput'
import NumberInput from '../../Components/Inputs/NumberInput'
//Data iterable
import phoneCodes from '../../data/phoneCodes'
//ImageneS:
import argflag from '../../assets/createAccount/arFlag.svg'
import earth from '../../assets/createAccount/earth.svg'

//Stripe:

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { obtainCustomerId } from '../../payment/utils/stripeHelpers'
import { styleFormStripeSub } from '../../payment/style/styleFormStripe'

import FormStripeSubscription from './FormStripeSubscription'
import { useDataGlobalContext } from '../../Context/GlobalContext'
import FormMPSubscription from './FormMPSubscription'
import { getPublicKeyStripe } from '../../utils/getDataFromAPI'

const defaultValueForm = {
  name: 'ramiro Perez',
  code: '',
  phone: '12345667',
  emoji: ''
}

function FormPayment() {
  const [data, handleDataForm] = useHandleData(defaultValueForm)
  const [selectedOption, setSelectedOption] = useState(true)
  const [error, setError] = useState('')
  const { user,stripePromise } = useDataGlobalContext()

  //toggle de metodo de pago
  const handleOptionChange = () => {
    console.log('go')
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
            <FormMPSubscription />
          ) : (
            <Elements stripe={stripePromise} options={styleFormStripeSub}>
              <FormStripeSubscription
                data={data || {}}
                id={user.id}
                email={user.email}
                setErrorMessage={setError}
              />
            </Elements>
          )}
        </div>
        {error && <div>{error}</div>}
      </div>
    </>
  )
}

export default FormPayment
