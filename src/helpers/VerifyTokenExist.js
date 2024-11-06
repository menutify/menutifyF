import { replace } from 'react-router-dom'

function VerifyTokenExist(moveTo, navigate) {
  if (!localStorage.getItem('token')) {
    navigate(moveTo, { replace: true })
  }

  return
}

export default VerifyTokenExist
