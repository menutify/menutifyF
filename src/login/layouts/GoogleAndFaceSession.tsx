import GoogleLoginComponent from '@/login/layouts/GoogleLoginComponent'
import FacebookLoginComponent from './FacebookLoginComponent'
function GoogleAndFaceSession({ className = '' }) {
  return (
    <div
      className={` flex gap-[7px] h-10 justify-center relative w-full ${className}`}
    >
      <GoogleLoginComponent />
      

      <FacebookLoginComponent />
    </div>
  )
}

export default GoogleAndFaceSession
