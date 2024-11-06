import useHandleData from '../../hooks/useHandleData'
import Options from '../Options'
import countries from '../../data/countries'
import TextInput from '../Inputs/TextInput'
import NumberInput from '../Inputs/NumberInput'
import phoneCodes from '../../data/phoneCodes'
import { useEffect } from 'react'

const defaultValueForm = {
  country: '',
  nameShop: '',
  code: '',
  phone: '',
  emoji: ''
}

function FormPayment() {
  const [data, handleDataForm] = useHandleData(defaultValueForm)

  const handlePayment = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    console.log('FormPayment')
  }, [])

  return (
    <form onSubmit={handlePayment}>
      <select
        className='select'
        name='country'
        onChange={handleDataForm}
        defaultValue='Selecciona un país'
      >
        <option value='Selecciona un país' disabled>
          Selecciona un país
        </option>
        {countries.map((info, i) => (
          <Options
            key={info.code + i}
            id={info.code}
            value={info.code}
            text={info.name}
          />
        ))}
      </select>
      <TextInput
        name={'nameShop'}
        data={data.nameShop}
        setData={handleDataForm}
        placeholder='nombre de negocio'
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div style={{ width: '50px' }}>
          <img src={data.emoji} alt='' />
        </div>
        <select
          className='select'
          name='code'
          onChange={handleDataForm}
          defaultValue='code'
        >
          <option value='code' disabled>
            +000
          </option>
          {phoneCodes.map((info, i) => (
            <Options
              key={info.code + i}
              id={info.code}
              value={info.dial_code}
              text={`${info.dial_code} ${info.name}`}
              emoji={info.emoji}
            />
          ))}
        </select>
        <NumberInput />
      </div>
    </form>
  )
}

export default FormPayment
