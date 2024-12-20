import penSVG from '@/assets/all/pen.svg'
import Parr from '@/Components/my/Parr'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import ModalRestaurant from './ModalRestaurant'

function UrlDetails({ status = 0 }) {
  const { menu } = useDataGlobalContext()

  return (
    <>
      <div className='flex gap-0.5 mb-2'>
        <Parr className='text-black underline'>
          {`http://locahost:5173/${menu.domain} `}
        </Parr>
        <Parr className='text-black'>_</Parr>
        <ModalRestaurant imgSVG={penSVG} name={'domain'} />
      </div>
      {status == 204 && (
        <p className='block text-red-500'>
          el dominio esta siendo usado, elija otro
        </p>
      )}
    </>
  )
}

export default UrlDetails
