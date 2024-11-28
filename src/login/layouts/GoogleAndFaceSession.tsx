import GoogleLoginComponent from '@/login/layouts/GoogleLoginComponent'
import googleLogo from '@/assets/login/google.svg'
import facebookLogo from '@/assets/login/facebook.svg'
function GoogleAndFaceSession() {
  return (
    <div
        className='flex gap-3  relative'
      >
        <GoogleLoginComponent />
        <button className=' w-[155px]  h-[2.25rem] flex gap-2 justify-center items-center bg-bg_input border-border_input_color text-parr_color_3 text-sm absolute top-0 left-0'>
          <img className={'h-full'} src={googleLogo} alt='' />
          <span>Google</span>
        </button>
        <button className='w-[155px] h-[2.25rem] flex gap-2 justify-center items-center bg-bg_input border-border_input_color hover:border-border_input_color text-parr_color_3 text-sm '>
          <img className={'h-full'} src={facebookLogo} alt='' />
          <span>Facebook</span>
        </button>
        {/* <FacebookLoginComponent /> */}
      </div>
  )
}

export default GoogleAndFaceSession