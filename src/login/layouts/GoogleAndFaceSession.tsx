import GoogleLoginComponent from '@/login/layouts/GoogleLoginComponent'
import googleLogo from '@/assets/login/google.svg'
import facebookLogo from '@/assets/login/facebook.svg'
function GoogleAndFaceSession({ className='' }) {
  return (
    <div
      className={` flex gap-[7px] h-10 justify-center relative w-full ${className}`}
    >
      <GoogleLoginComponent />
      <button className='text-base min-w-[155px] w-[50%] h-full flex flex-1 gap-2 justify-center items-center bg-bg_input border-border_input_color text-parr_color_3 absolute top-0 left-0 '>
        <img className={'h-[80%]'} src={googleLogo} alt='' />
        <span>Google</span>
      </button>
      <button className='h-full min-w-[155px] flex gap-2 justify-center items-center bg-bg_input border-border_input_color hover:border-border_input_color text-parr_color_3 text-base flex-1 '>
        <img className={'h-[80%]'} src={facebookLogo} alt='' />
        <span>Facebook</span>
      </button>
      
      {/* <FacebookLoginComponent /> */}
    </div>
  )
}

export default GoogleAndFaceSession
