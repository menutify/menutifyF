import FormFieldRestaurant from '@/Components/Forms/FormFieldRestaurant'
import Title2 from '@/components/my/Title2'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import { restaurantData } from '@/data/text'
import useFormHook from '@/hooks/useFormHook'

import {
  domainMethod,
  restaurantAddress,
  restaurantNumber,
  restaurantSendMethod
} from '@/utils/formScheme'
import { Dispatch, SetStateAction } from 'react'

function FormRestaurantUpdate({
  visibilityModal,
  name
}: {
  visibilityModal: Dispatch<SetStateAction<boolean>>
  name: 'address' | 'number' | 'send_method' | 'domain'
}) {
  const { restaurant, setRestaurant } = useDataGlobalContext()

  const arrayValueForm = [
    {
      scheme: restaurantAddress,
      value: {
        address: restaurant.address
      },
      title: restaurantData.modal_address,
      ph: restaurantData.modal_address
    },
    {
      scheme: restaurantNumber,
      value: {
        number: restaurant.number
      },
      title: restaurantData.modal_number,
      ph: restaurantData.modal_number_ph
    },
    {
      scheme: restaurantSendMethod,
      value: {
        send_method: restaurant.send_method
      },
      title: restaurantData.modal_send,
      ph: restaurantData.modal_send_ph
    },
    {
      scheme: domainMethod,
      value: {
        send_method: restaurant.domain
      },
      title: restaurantData.modal_domain,
      ph: restaurantData.modal_domain_ph
    }
  ]

  let defaultValueForm = arrayValueForm[0]

  if (name === 'number') {
    defaultValueForm = arrayValueForm[1]
  } else if (name === 'send_method') {
    defaultValueForm = arrayValueForm[2]
  } else if (name === 'domain') {
    defaultValueForm = arrayValueForm[3]
  }

  const formOptions = useFormHook(
    defaultValueForm.scheme,
    defaultValueForm.value
  )
  async function onSubmit(
    values: Record<'address' | 'number' | 'send_method' | 'domain', string>
  ) {
    setRestaurant({ ...restaurant, [name]: values[name] })

    visibilityModal(false)
  }

  return (
    <>
      <Title2 className='text-xl md:text-3xl'>{defaultValueForm.title}</Title2>
      <Form {...formOptions}>
        <form
          onSubmit={formOptions.handleSubmit(onSubmit)}
          className='flex flex-col gap-3 w-full'
        >
          <FormFieldRestaurant
            form={formOptions}
            name={name}
            ph={defaultValueForm.ph}
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
