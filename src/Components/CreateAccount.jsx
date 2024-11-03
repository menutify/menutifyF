import React, { useState } from 'react'
import GoogleLoginComponent from './Login/GoogleLoginComponent'
import FacebookLoginComponent from './Login/FacebookLoginComponent'

function CreateAccount() {
  const [dataForm, setDataForm] = useState({
    email: '',
    password: '',
    passwordTwo: ''
  })

  const handleNewUser = (e) => {
    e.preventDefault()
  }

  const obtainDataOfInputs = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value })
    console.log(dataForm)
  }
  
  return (
    <div>
      <div className='socialRedContainer'>
        <GoogleLoginComponent />
        <FacebookLoginComponent />
      </div>
      <p>O registrate con tu email</p>
      <form className='formRegister' onSubmit={handleNewUser}>
        <label htmlFor='email'>Email:</label>
        <input
          name='email'
          type='email'
          id='email'
          placeholder='Email'
          value={dataForm.email}
          onChange={obtainDataOfInputs}
          required
        />

        <label htmlFor='password'>Contraseña:</label>
        <input
          type='password'
          id='password'
          name='password'
          placeholder='Contraseña'
          value={dataForm.password}
          onChange={obtainDataOfInputs}
          required
        />

        <label htmlFor='passwordTwo'>Confirmar Contraseña:</label>
        <input
          type='password'
          id='passwordTwo'
          name='passwordTwo'
          placeholder='Confirmar Contraseña'
          value={dataForm.passwordTwo}
          onChange={obtainDataOfInputs}
          required
        />
        <button type='submit'>Continuar -&gt;</button>
      </form>
    </div>
  )
}

export default CreateAccount
