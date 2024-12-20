import QRComponent from '@/Components/my/QRComponent'
import Text from '@/Components/my/Text'
import Title2 from '@/Components/my/Title2'
import { Button } from '@/Components/ui/button'
import { Card } from '@/Components/ui/card'
import { useDataGlobalContext } from '@/Context/GlobalContext'

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
            <QRComponent domain={import.meta.env.VITE_APP_PATH +'/'+ menu.domain} />
            <input type='text' value={'localhost:3000'} />
          </Card>
        </div>
      </Card>
    </div>
  )
}

export default GetDataShareMenu
