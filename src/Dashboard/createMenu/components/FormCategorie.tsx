import FormFieldRestaurant from '@/Components/Forms/FormFieldRestaurant'
import Title2 from '@/Components/my/Title2'
import { Button } from '@/Components/ui/button'
import { Card } from '@/Components/ui/card'
import { Form } from '@/Components/ui/form'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import { routesApi } from '@/data/routes'
import { restaurantData } from '@/data/text'
import useFormHook from '@/hooks/useFormHook'
import { Categories } from '@/types'
import { categoriesScheme } from '@/utils/formScheme'
import HandleFormSubmit from '@/utils/handleForSubmit'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'



interface FormCategorie {
  action: string
  visibilityModal: Dispatch<SetStateAction<boolean>>
  index: number
}

function FormCategorie({ action, visibilityModal, index }: FormCategorie) {
  const { categories, setCategories, menu } = useDataGlobalContext()
  const [defaultValuesForm, setDefaultValuesForm] = useState({
    name: '',
    desc: ''
  })

  useEffect(() => {
    if (action === 'edit') {
      const { name, desc } = categories[index].details
      setDefaultValuesForm({ name, desc: desc || '' })
    }
  }, [])

  const formOptions = useFormHook(categoriesScheme, defaultValuesForm)

  useEffect(() => {
    formOptions.reset(defaultValuesForm)
  }, [defaultValuesForm])

  const { isPending, handleSubmit, handlePatchSubmit } = HandleFormSubmit()

  const createNewItem = async (values: Record<string, string>) => {
    const { name, desc } = values

    const data = await handleSubmit(routesApi.cat, {
      id_menu: menu.id,
      name,
      desc
    })

    if (!data) {
      return
    }

    const resp = data as Categories

    if (!isPending) {
      setCategories((prev) => {
        const update = [...prev]

        const newObject = {
          id: resp.id,
          pos: resp.pos,
          id_menu: menu.id,
          details: {
            id: resp.details.id,
            id_cat: resp.id,
            name,
            desc,
            foods: []
          }
        }

        update.push(newObject)

        console.log({ categories: update })

        return update
      })
      visibilityModal(false)
    }
  }

  const updateOldItem = async (values: Record<string, string>) => {
    const { name, desc } = values

    const myCatId = categories[index].id

    console.log({ myCatId })

    const data = await handlePatchSubmit(`${routesApi.cat}/${myCatId}`, {
      name,
      desc
    })

    if (!data) return

    if (!isPending) {
      setCategories((prev) => {
        return prev.map((cat, i) => {
          if (i === index) {
            return {
              ...cat,
              details: {
                ...cat.details,
                name,
                desc
              }
            }
          }
          return cat
        })
      })

      visibilityModal(false)
    }
  }

  return (
    <div className='flex-complete absolute top-0 left-0 w-full h-full z-20'>
      <Card className='flex-complete bg-red-50 flex-col gap-1 w-full p-3 max-w-[500px]'>
        <Title2 className='text-xl md:text-3xl'>
          {'Crear nueva categoría'}
        </Title2>
        <Form {...formOptions}>
          <form
            onSubmit={formOptions.handleSubmit(
              action === 'create' ? createNewItem : updateOldItem
            )}
            className='flex flex-col gap-3 w-full'
          >
            <FormFieldRestaurant
              form={formOptions}
              name={'name'}
              ph={'nombre de categoría'}
              title=''
            />
            <FormFieldRestaurant
              form={formOptions}
              name={'desc'}
              type='textarea'
              ph={'descripcion'}
              title=''
            />
            <Button className='bg-black ' type='submit'>
              {restaurantData.modal_button}
            </Button>
          </form>
        </Form>
        <Button
          disabled={isPending ? true : false}
          className='w-full'
          onClick={() => visibilityModal(false)}
        >
          Cancelar
        </Button>
      </Card>
    </div>
  )
}

export default FormCategorie
