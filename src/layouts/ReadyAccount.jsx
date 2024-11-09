import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import HandleFormSubmit from '../utils/handleForSubmit'

function ReadyAccount() {
  const [confirm, setConfirm] = useState(true)
  const navigate = useNavigate()
  const { token } = useParams()

  const { error, handleSubmit } = HandleFormSubmit({})

  useEffect(() => {
    handleSubmit({}, 'user/create', { token })
      .then((resp) => {
        if (!resp) {
          setConfirm(true)
          return
        }
        console.log({ resp })
        localStorage.setItem('token', resp.data.token)
        setConfirm(false)
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
        disabled={confirm}
        onClick={() => navigate('/create-account/payment ')}
      >
        Continue -&gt;
      </button>
    </div>
  )
}

export default ReadyAccount
