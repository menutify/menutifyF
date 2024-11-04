import { useParams } from 'react-router-dom'
import FormChangePassword from '../Components/Forms/FormChangePassword'

function ChangePassword() {
  const { token } = useParams()

  return (
    <div>
      <FormChangePassword token={token} />
    </div>
  )
}

export default ChangePassword
