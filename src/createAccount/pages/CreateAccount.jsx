import GoogleLoginComponent from '../../login/layouts/GoogleLoginComponent'
import FacebookLoginComponent from '../../login/layouts/FacebookLoginComponent'
import FormCreateAccount from '../components/FormCreateAccount'

function CreateAccount() {
  return (
    <div className='login-container'>
      <div className='socialRedContainer'>
        <GoogleLoginComponent />
        <FacebookLoginComponent />
      </div>
      <p>O registrate con tu email</p>
      <FormCreateAccount />
    </div>
  )
}

export default CreateAccount
