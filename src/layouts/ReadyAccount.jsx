import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import HandleFormSubmit from '../helpers/handleForSubmit'

function ReadyAccount() {
  const navigate = useNavigate()
  const { token } = useParams()

  const { error, isPending, handleSubmit } = HandleFormSubmit({})

  useEffect(() => {
    handleSubmit({}, 'user/create', { token })
      .then((resp) => {
        console.log({ resp })
        localStorage.setItem('token', resp.data.token)
      })
      .catch(() => {
        console.error('Error en el inicio de sesión:')
        return
      })
  }, [])

  return (
    <div>
      ReadyAccount
      {error.error && <p className='error'>{error.msg}</p>}
      <button
        disabled={isPending}
        onClick={() => navigate('/create-account/payment ')}
      >
        Continue -&gt;
      </button>
    </div>
  )
}

export default ReadyAccount
