import FormFieldRestaurant from '@/Components/Forms/FormFieldRestaurant'
import Title2 from '@/Components/my/Title2'
import { Button } from '@/Components/ui/button'
import { Form } from '@/Components/ui/form'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import { restaurantData } from '@/data/text'
import useFormHook from '@/hooks/useFormHook'

function FormRestaurantUpdate({
  visibilityModal,
  name,
  scheme,
  value,
  title,
  ph
}) {
  const { restaurant, setRestaurant, menu, setMenu } = useDataGlobalContext()

  const formOptions = useFormHook(scheme, value || {})

  async function onSubmit(values: Record<string, string>) {
    if (name === 'domain') {
      setMenu({
        ...menu,
        domain: values[name] || values[name] != '' ? values[name] : menu.domain,
        changed: true
      })
      visibilityModal(false)

      return
    }
    setRestaurant({
      ...restaurant,
      [name]: values[name] || values[name] != '' ? values[name] : '',
      changed: true
    })

    visibilityModal(false)
  }

  return (
    <>
      <Title2 className='text-xl md:text-3xl'>{title}</Title2>
      <Form {...formOptions}>
        <form
          onSubmit={formOptions.handleSubmit(onSubmit)}
          className='flex flex-col gap-3 w-full'
        >
          <FormFieldRestaurant
            form={formOptions}
            name={name}
            ph={ph}
            title=''
          />
          <Button className='bg-black ' type='submit'>
            {restaurantData.modal_button}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default FormRestaurantUpdate
