import FormFieldRestaurant from '@/Components/Forms/FormFieldRestaurant'
import FormFieldCheckbox from '@/Components/my/FormFieldCheckbox'
import Parr from '@/Components/my/Parr'
import Title2 from '@/Components/my/Title2'
import Title3 from '@/Components/my/Title3'
import { Button } from '@/components/ui/button'
import { Card } from '@/Components/ui/card'
import { Form } from '@/components/ui/form'
import { SelectItem } from '@/Components/ui/select'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import { foodData } from '@/data/text'
import useFormHook from '@/hooks/useFormHook'
import { Food } from '@/types'
import { createFoodScheme } from '@/utils/formScheme'
import { SelectContent } from '@radix-ui/react-select'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import foodSVG from '@/assets/createMenu/food.svg'
import HandleFormSubmit from '@/utils/handleForSubmit'
import { routesApi } from '@/data/routes'

interface defaultValues {
  name: string
  cat: string
  desc: string
  star: boolean | string
  price: string
  img: string
  id?: number
  id_food?: number
}

interface ModalFood {
  action: string //edit o create
  parentId?: number //id de la categoria alaqu pertence
  childId?: number // id del componente a editar
  indexChild?: number // index del componente a editar
  visibilityModal: Dispatch<SetStateAction<boolean>>
}

function ModalFood({
  action = '',
  parentId = -1,
  childId = -1,
  indexChild = -1,
  visibilityModal
}: ModalFood) {
  const { categories, setCategories, menu, restaurant } = useDataGlobalContext()

  const [chargeImgURL, setChargeImgURL] = useState('')
  const [chargeImageFile, setChargeImageFile] = useState<File>()

  // Valores predeterminados
  const [defaultValues, setDefaultValues] = useState<defaultValues>({
    name: '',
    cat: '',
    desc: '',
    star: false,
    price: '',
    img: chargeImgURL
  })

  const { error, isPending, handleSubmitForm, handlePatchFormSubmit } =
    HandleFormSubmit()

  useEffect(() => {
    if (action === 'edit') {
      console.log('------cargado datos------')

      console.log('entramos')
      const indexOfParent = categories.findIndex((e) => e.id === parentId)

      console.log({ indexOfParent })
      if (indexOfParent !== -1) {
        const data = categories[indexOfParent].details.foods[indexChild]

        console.log({ foodDetail: data.foodDetail })
        const { img, name, price, desc, star, id, id_food } = data.foodDetail
        console.log(data.foodDetail)
        console.log('------cargado correctamente------')
        setChargeImgURL(img)
        setDefaultValues({
          name,
          price: price + '',
          desc: desc + '',
          star,
          id,
          id_food,
          img,
          cat: parentId + ''
        })
      }
    }
  }, [])

  const formOptions = useFormHook(createFoodScheme, defaultValues)

  useEffect(() => {
    formOptions.reset(defaultValues)
  }, [defaultValues])

  const editFunction = async (values: Record<string, string>) => {
    console.log('------editando------')

    const { cat, ...allValues } = values
    const newParentPosition = parseInt(cat)

    const data = await handlePatchFormSubmit(`${routesApi.food}/${childId}`, {
      id_menu: menu.id,
      id_rest: restaurant.id,
      name: allValues.name,
      price: allValues.price,
      star: allValues.star,
      desc: allValues.desc,
      singleImage: chargeImageFile
    })

    if (!data) return

    setCategories((prev) => {
      return prev.map((category) => {
        if (category.id === newParentPosition) {
          console.log({ newParentPosition, id: category.id, category })
          return {
            ...category,
            details: {
              ...category.details,
              foods: category.details.foods.map((food) => {
                console.log({ food, id: defaultValues.id })
                return food.id === defaultValues.id_food
                  ? {
                      ...food,
                      foodDetail: {
                        ...food.foodDetail,
                        ...allValues,
                        img: chargeImgURL
                      }
                    }
                  : food
              })
            }
          }
        }

        return category
      })
    })

    if (!isPending) {
      visibilityModal(false)
    }
  }

  async function onSubmit(values: Record<string, string>) {
    const { name, cat, desc, star, price } = values

    const data = await handleSubmitForm(routesApi.food, {
      id_cat: cat,
      price,
      name,
      star,
      desc,
      singleImage: chargeImageFile
    })

    if (!data) return
    if (!isPending) {
      setCategories((prev) => {
        const updatedCategories = prev.map((category) => {
          if (category.id === parseInt(cat)) {
            // Crear el nuevo objeto Food

            const newFood: Food = {
              id: data.resp.id,
              id_cat: parseInt(cat),
              pos: data.resp.pos,
              state: true,
              foodDetail: {
                id: data.resp.foodDetail.id,
                id_food: data.resp.id,
                img: data.resp.foodDetail.img,
                price: parseFloat(price),
                name,
                desc,
                star
              }
            }

            return {
              ...category,
              details: {
                ...category.details,
                foods: [...(category.details.foods || []), newFood]
              }
            }
          }

          return { ...category } // Si no es la categoría, regresar sin cambios
        })

        return [...updatedCategories] // Retornar la nueva lista de categorías
      })
      //refrescar la pagina sino los childs del array no se actualizan
      // navigate('/dashboard/create')
      visibilityModal(false)
    }
  }

  const setImgToContainer = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        setChargeImageFile(file)

        setChargeImgURL(e.target?.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className='fixed top-0 left-0 z-20 flex-complete w-full h-full bg-[#0005]'>
      <Card className='flex-complete bg-red-50 flex-col gap-1 w-full p-3 max-w-[500px] '>
        <Title2>{action === 'edit' ? defaultValues.name : 'Create'}</Title2>
        <Parr>{foodData.parr1}</Parr>
        <Form {...formOptions}>
          <form
            onSubmit={
              action === 'edit'
                ? formOptions.handleSubmit(editFunction)
                : formOptions.handleSubmit(onSubmit)
            }
            className='flex flex-col gap-3 min-w-300px w-full'
          >
            <FormFieldRestaurant
              form={formOptions}
              name={'name'}
              ph={foodData.ph1}
              title={foodData.subtitle1}
            />

            <FormFieldRestaurant
              form={formOptions}
              name={'cat'}
              title={foodData.subtitle2}
              type='select'
              className='relative w-full'
              defaultSelectValue={defaultValues.cat}
              selectDisable={action === 'edit' && true}
            >
              <SelectContent className='bg-yellow-50 w-full '>
                {!categories[0] ? (
                  <></>
                ) : (
                  categories.map((e) => (
                    <SelectItem
                      key={e.id + 'selectOption'}
                      className='w-full bg-[#0004]'
                      value={e.id + ''}
                      id={e.id + ''}
                    >
                      {e.details.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </FormFieldRestaurant>

            <div className='flex-complete gap-2 h-32'>
              <label
                htmlFor='foodImageCreate'
                className='cursor-pointer flex-1'
              >
                <Title3>{foodData.imgTitle}</Title3>
                <Parr>{foodData.imgSubtitle}</Parr>
                <span>{foodData.imgButton}</span>
              </label>
              <input
                className='hidden'
                id='foodImageCreate'
                type='file'
                accept='image/*'
                onChange={setImgToContainer}
              />

              <picture className=' w-40 h-40 flex-complete overflow-hidden rounded-lg'>
                <img
                  className='h-full w-full object-cover'
                  src={chargeImgURL === '' ? foodSVG : chargeImgURL}
                  alt=''
                />
              </picture>
            </div>
            <FormFieldRestaurant
              form={formOptions}
              name={'desc'}
              ph={foodData.ph2}
              title={foodData.subtitle3}
              type='textarea'
            />
            <FormFieldCheckbox
              form={formOptions}
              name={'star'}
              className='text-black md:text-black'
              value='Destacar platillo'
            />
            <FormFieldRestaurant
              form={formOptions}
              name={'price'}
              ph={foodData.ph3}
              title={foodData.subtitle4}
            />
            <Button className='bg-black ' type='submit'>
              {foodData.saveButton}
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
        {error && <p className='text-red-500'>{error.msg}</p>}
      </Card>
    </div>
  )
}

export default ModalFood
