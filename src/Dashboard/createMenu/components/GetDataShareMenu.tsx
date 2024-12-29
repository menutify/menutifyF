import CopyButton from '@/Components/my/CopyLabel'
import QRComponent from '@/Components/my/QRComponent'
import Text from '@/Components/my/Text'
import Title2 from '@/Components/my/Title2'
import { Button } from '@/Components/ui/button'
import { Card } from '@/Components/ui/card'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import { Link } from 'react-router-dom'

function GetDataShareMenu({ closeModal }) {
  const { menu } = useDataGlobalContext()

  return (
    <div className='flex-complete absolute top-0 left-0 w-full h-full z-20 bg-[#0002] '>
      <Card>
        <Button onClick={() => closeModal(false)}>x</Button>
        <Title2>Menu publicado</Title2>
        <div>
          <Text>Tu nuevo menu ha sido creado exitosamente</Text>
          <Card>
            <QRComponent
              domain={import.meta.env.VITE_APP_PATH + '/' + menu.domain}
            />
            <div>
              <CopyButton
                textToCopy={import.meta.env.VITE_APP_PATH + '/' + menu.domain}
              />
            </div>

            <Link
              className='border rounded-lg border-black  h-10 p-4 text-2xl flex-complete'
              to={'/dashboard/menu/pdf/' + menu.domain}
              target='_blank'
              rel='noopener noreferrer'
            >
              link pdf
            </Link>
          </Card>
        </div>
      </Card>
    </div>
  )
}

export default GetDataShareMenu
