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
import axiosInstance from '@/utils/axiosConfig'

import axios from 'axios'
import ImgContainer from '@/Components/my/ImgContainer'
import Parr1 from '@/Components/my/Parr1'
import alertSVG from '@/assets/login/alert.svg'
const defaultValueForm = {
  email: ''
}

interface dataPayment {
  status: string
  status_detail: string
}

function FormPayment() {
  const [modalError, setModalError] = useState(false)
  const formOptions = useFormHook(caPaymentFormScheme, defaultValueForm)

  const { setApiPetition } = useDataGlobalContext()

  const onSubmit = async (e: ICardPaymentFormData<ICardPaymentBrickPayer>) => {
    console.log(e)
    try {
      // setApiPetition(true)
      const { data } = await axiosInstance.post(
        '/payment/create-payment'+ `?token=${localStorage.getItem('token')}`,
        { ...e },
        {
          withCredentials: true
        }
      )
      // setApiPetition(false)

      if (data.error) {
        setModalError(true)
        setApiPetition(false)
        return
      }

      const { status, status_detail } = data.data as dataPayment

      if (status != 'approved') {
        setModalError(true)
        setApiPetition(false)
        return
      }

      console.log({ status, status_detail })

      //rest.data{
      //   error: false,
      // data: { email, id, id_pay },
      //msg: 'Pago correctamente procesado'
      // }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setModalError(true)
        setApiPetition(false)
        console.log(error)
        return
      }
      console.error('Error inesperado:', error)
    }
  }

  return (
    <>
      <Form {...formOptions}>
        <form
          onSubmit={formOptions.handleSubmit(onSubmit)}
          className='space-y-2 flex flex-col '
        >
          <div className='overflow-hidden'>
            <div
            // style={{ display: paymentState.modal ? 'none' : 'block' }}
            >
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
                onError={(e) => console.log({ e })}
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
        {modalError && (
          <div className='w-full md:w-[40%] flex-complete absolute top-0 left-0'>
            <div className=' border-2 border-[#ff0000] text-[#ff0000] flex-complete rounded-xl px-[20px] bg-[#ff0000] bg-opacity-20 gap-[5px] py-[10px]'>
              <ImgContainer className='h-5' src={alertSVG} />
              <Parr1 className='text-[10px]'>
                No pudimos procesar tu pago. Revisa la información de tu tarjeta
                e intenta de nuevo.
              </Parr1>
            </div>
          </div>
        )}
      </Form>
    </>
  )
}

export default FormPayment
