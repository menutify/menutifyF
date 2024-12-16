// import HandleFormSubmit from '@/utils/handleForSubmit'
import useFormHook from '@/hooks/useFormHook'
import { caPaymentFormScheme } from '@/utils/formScheme'
import { Form } from '@/Components/ui/form'
import { CardPayment } from '@mercadopago/sdk-react'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import { useState } from 'react'
import {
  ICardPaymentBrickPayer,
  ICardPaymentFormData
} from '@mercadopago/sdk-react/bricks/cardPayment/type'
import checkSVG from '@/assets/payment/check.svg'
import errorSVG from '@/assets/payment/error.svg'
import { Button } from '@/Components/ui/button'
import Parr from '@/Components/my/Parr'
import axiosInstance from '@/utils/axiosConfig'
import { routesPath } from '@/data/routes'
import { useNavigate } from 'react-router-dom'

const defaultValueForm = {
  email: ''
}

interface dataPayment {
  status: string
  status_detail: string
}

function FormPayment() {
  const [modal, setModal] = useState(false)
  const [state, setState] = useState(false)
  const [msg, setMsg] = useState('')
  const formOptions = useFormHook(caPaymentFormScheme, defaultValueForm)
  const navigate = useNavigate()
  const { user } = useDataGlobalContext()

  const onSubmit = async (e: ICardPaymentFormData<ICardPaymentBrickPayer>) => {
    console.log({ e, user })
    try {
      const { data: respData } = await axiosInstance.post(
        '/payment/create-payment',
        {
          ...e,
          user
        }
      )

      const { data } = respData
      console.log({ data })
      if (!data) return

      const { status, status_detail } = data as dataPayment
      setModal(true)
      console.log({ status, status_detail })
      if (status === 'rejected') {
        setState(false)
        setMsg(status_detail)
        return
      }

      setState(true)
      setMsg(status_detail)

      //rest.data{
      //   error: false,
      // data: { email, id, id_pay },
      //msg: 'Pago correctamente procesado'
      // }
    } catch (error) {
      console.log(error)
      return
    }
  }

  const continueRegister = () => {
    navigate(routesPath.completePayment)
  }

  const goBack = () => {
    setModal(false)
  }

  return (
    <>
      <Form {...formOptions}>
        <form
          onSubmit={formOptions.handleSubmit(onSubmit)}
          className='space-y-2 flex flex-col '
        >
          <div className='overflow-hidden'>
            {modal ? (
              <div className='w-full gap-4 pb-4 h-full flex flex-col justify-center items-center'>
                <Parr>
                  {state ? 'Se pago correctamente' : 'Hubo un error en el pago'}
                </Parr>
                <span className='text-[#666666]'>Cod: {msg}</span>
                <div className='w-[20%]'>
                  <img src={state ? checkSVG : errorSVG} alt='' />
                </div>

                <Button
                  className='bg-ph_color_1 mt-3 h-10 w-full'
                  onClick={state ? continueRegister : goBack}
                >
                  {state ? ' Continuar' : 'Volver'}
                </Button>
              </div>
            ) : null}
            <div style={{ display: modal ? 'none' : 'block' }}>
              <CardPayment
                customization={{
                  visual: {
                    style: {
                      theme: 'dark'
                    }
                  }
                }}
                initialization={{ amount: import.meta.env.VITE_PRICE_MP }}
                onSubmit={onSubmit}
              />
            </div>
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
