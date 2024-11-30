// import HandleFormSubmit from '@/utils/handleForSubmit'
import useFormHook from '@/hooks/useFormHook'
import { caPaymentFormScheme } from '@/utils/formScheme'
import { Form } from '@/components/ui/form'
import { CardPayment } from '@mercadopago/sdk-react'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import axiosInstance from '@/utils/axiosConfig'

const defaultValueForm = {
  email: ''
}

function FormPayment() {
  // const [modal, setModal] = useState(false)
  const formOptions = useFormHook(caPaymentFormScheme, defaultValueForm)

  const { user } = useDataGlobalContext()

  // const { handleSubmit, error, isPending } = HandleFormSubmit()

  const onSubmit = async (values) => {
    console.log(values)
    try {
      const rest = await axiosInstance.post('/payment/create-payment', {
        ...values,
        user
      })
      console.log(rest)
    } catch (error) {
      console.log(error)
      return
    }
  }

  return (
    <>
      <Form {...formOptions}>
        <form
          onSubmit={formOptions.handleSubmit(onSubmit)}
          className='space-y-2 flex flex-col gap-3'
        >
          <div className='mb-2 overflow-hidden'>
            <CardPayment
              customization={{
                visual: {
                  style: {
                    theme: 'dark'
                  }
                }
              }}
              initialization={{ amount: 100 }}
              onSubmit={onSubmit}
            />
          </div>
          {/* <Button
            className='bg-primary_color w-full '
            type='submit'
            disabled={isPending ? true : false}
          >
            {caPayment.button}
          </Button> */}
        </form>
      </Form>
    </>
  )
}

export default FormPayment
