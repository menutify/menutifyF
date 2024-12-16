import Title2 from '@/Components/my/Title2'
import { Button } from '@/Components/ui/button'
import { Card } from '@/Components/ui/card'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import { routesApi } from '@/data/routes'
import HandleFormSubmit from '@/utils/handleForSubmit'
import { Dispatch, SetStateAction } from 'react'

interface DeleteModal {
  id: number
  type: string
  index: number
  visibilityModal: Dispatch<SetStateAction<boolean>>
  parentId?: number
}

function DeleteModal({
  id,
  index,
  visibilityModal,
  type,
  parentId = -1
}: DeleteModal) {
  const { categories, setCategories } = useDataGlobalContext()
  const { error, isPending, handleDelete } = HandleFormSubmit()

  const onSubmit = async () => {
    //eliminar del array
    //parent
    if (type === 'category') {
      const data = await handleDelete(routesApi.cat + '/' + id)

      if (!data) return

      setCategories((prev) => {
        const update = [...prev]
        update.splice(index, 1)
        update.forEach((e, i) => (e.pos = i))
        return update
      })
    }

    if (type === 'food') {
      const indexParent = categories.findIndex((e) => e.id == parentId)

      const data = await handleDelete(routesApi.food + '/' + id)

      if (!data) return

      setCategories((prev) => {
        const update = [...prev]
        update[indexParent].details.foods.splice(index, 1)
        update[indexParent].details.foods.forEach((e, i) => (e.pos = i))
        return update
      })
    }
    return
    //child

    //eliminar de la bd a traves del id
  }

  return (
    <div className='flex-complete absolute top-0 left-0 w-full h-full z-20'>
      <Card className='flex-complete bg-red-50 flex-col gap-1 w-full p-3 max-w-[500px]'>
        <Title2>{`Borrar ${
          type === 'category' ? 'Categoría' : 'Plato'
        }`}</Title2>
        <p>
          Para eliminar completamente escriba{' '}
          <b>
            <i>eliminar</i>
          </b>{' '}
          a continuación:
        </p>

        <Button
          disabled={isPending ? true : false}
          className='w-full'
          onClick={onSubmit}
        >
          Eliminar
        </Button>
        <Button
          disabled={isPending ? true : false}
          className='w-full'
          onClick={() => visibilityModal(false)}
        >
          Cancelar
        </Button>
        {error && <p className='bg-red-500'>{error.msg}</p>}
      </Card>
    </div>
  )
}

export default DeleteModal
