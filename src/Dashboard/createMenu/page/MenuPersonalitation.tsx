import InputImage from '@/Components/my/InputImage'
import PickColor from '@/Components/my/PickColor'
import RadioButton from '@/Components/my/RadioButton'
import Title2 from '@/Components/my/Title2'
import Title3 from '@/Components/my/Title3'
import { Button } from '@/Components/ui/button'
import { Card } from '@/Components/ui/card'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import UrlDetails from '@/Dashboard/restaurant/components/UrlDetails'
import { routesApi } from '@/data/routes'
import HandleFormSubmit from '@/utils/handleForSubmit'
import { useState } from 'react'

function MenuPersonalitation({ closeModal }) {
  const [imageHeaderDataContainer, setImageHeaderDataContainer] =
    useState<File>()

  const { menu, setMenu } = useDataGlobalContext()

  const { error, isPending, handlePatchFormSubmit } = HandleFormSubmit()

  const submitData = async () => {
    if (menu.changed === true) {
      const data = await handlePatchFormSubmit(
        routesApi.menu + '?size=header',
        {
          ...menu,
          singleImage: imageHeaderDataContainer
        }
      )
      if (!data) return

      const { myUrl } = data as { myUrl: string }
      setMenu({ ...menu, changed: false, header_url: myUrl })
    }
  }

  return (
    <div className='flex-complete absolute top-0 left-0 w-full h-full z-20 bg-[#0002] '>
      <Card className='p-3 md:p-6 flex flex-col gap-6 w-2/3 min-w-[300px] max-w-[450px]'>
        <Button onClick={() => closeModal(false)}>x</Button>
        <Title2 className='text-xl md:text-3xl'>Personaliza tu menú</Title2>
        <div className='flex mb-3 gap-2'>
          <InputImage
            setImageDataContainer={setImageHeaderDataContainer}
            title={'Fondo de Página'}
            content={'Subir fondo'}
            type='header'
          />
        </div>
        <span className='block h-0.5 w-full bg-[#ddd4]'></span>
        <Title3>Personaliza tu dominio</Title3>
        <UrlDetails />
        <span>Selecciona la versión que mas te guste</span>

        <RadioButton />
        <Title3>Elije tu color</Title3>
        <PickColor />
        <Button
          className={`${
            isPending ? 'bg-white' : 'bg-border_input_color'
          } flex-complete p-4 gap-4  md:px-10 md:rounded-lg  rounded-lg h-14 relative`}
          onClick={submitData}
          disabled={isPending}
        >
          Guardar cambios
        </Button>
        {error.error && (
          <p className='absolute -bottom-6 block text-red-500'>{error.msg}</p>
        )}
      </Card>
    </div>
  )
}

export default MenuPersonalitation
