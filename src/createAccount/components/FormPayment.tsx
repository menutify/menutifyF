// import HandleFormSubmit from '@/utils/handleForSubmit'
import useFormHook from '@/hooks/useFormHook'
import { caPaymentFormScheme } from '@/utils/formScheme'
import { Form } from '@/Components/ui/form'
import { CardPayment } from '@mercadopago/sdk-react'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import { useReducer } from 'react'
import {
  ICardPaymentBrickPayer,
  ICardPaymentFormData
} from '@mercadopago/sdk-react/bricks/cardPayment/type'
import loadingPaySVG from '@/assets/payment/loadingpay.svg'
import errorSVG from '@/assets/payment/error.svg'
import { Button } from '@/Components/ui/button'
import Parr from '@/Components/my/Parr'
import axiosInstance from '@/utils/axiosConfig'

import axios from 'axios'

const defaultValueForm = {
  email: ''
}

interface dataPayment {
  status: string
  status_detail: string
}

interface PaymentState {
  modal: boolean
  state: boolean
  msg: string
}

const initialState: PaymentState = {
  modal: false,
  state: false,
  msg: ''
}

type PaymentAction =
  | { type: 'SET_MODAL'; modal: boolean }
  | { type: 'SET_STATE'; state: boolean }
  | { type: 'SET_MSG'; msg: string }
  | { type: 'RESET' }

function paymentReducer(
  state: PaymentState,
  action: PaymentAction
): PaymentState {
  switch (action.type) {
    case 'SET_MODAL':
      return { ...state, modal: action.modal }
    case 'SET_STATE':
      return { ...state, state: action.state }
    case 'SET_MSG':
      return { ...state, msg: action.msg }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

function FormPayment() {
  const [paymentState, dispatch] = useReducer(paymentReducer, initialState)
  const formOptions = useFormHook(caPaymentFormScheme, defaultValueForm)
 
  const { setApiPetition } = useDataGlobalContext()

  const onSubmit = async (e: ICardPaymentFormData<ICardPaymentBrickPayer>) => {
    // console.log(e)
    try {
      setApiPetition(true)
      const { data } = await axiosInstance.post('/payment/create-payment', e, {
        withCredentials: true
      })
      setApiPetition(false)

      dispatch({ type: 'SET_MODAL', modal: true })
      if (data.error) {
        dispatch({ type: 'SET_STATE', state: false })
        dispatch({
          type: 'SET_MSG',
          msg: data.msg
        })
        return
      }

      const { status, status_detail } = data.data as dataPayment

      if (status != 'approved') {
        dispatch({ type: 'SET_STATE', state: false })
        dispatch({
          type: 'SET_MSG',
          msg: status_detail
        })
        return
      }

      dispatch({ type: 'SET_STATE', state: true })
      dispatch({
        type: 'SET_MSG',
        msg: status_detail
      })

      //rest.data{
      //   error: false,
      // data: { email, id, id_pay },
      //msg: 'Pago correctamente procesado'
      // }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        dispatch({ type: 'SET_MODAL', modal: true })
        dispatch({ type: 'SET_STATE', state: false })
        dispatch({
          type: 'SET_MSG',
          msg: error.response?.data?.msg || 'Error desconocido'
        })
        setApiPetition(false)
        console.log(error)
        return
      }
      console.error('Error inesperado:', error)
    }
  }

  const goBack = () => {
    dispatch({ type: 'SET_MODAL', modal: false })
  }

  return (
    <>
      <Form {...formOptions}>
        <form
          onSubmit={formOptions.handleSubmit(onSubmit)}
          className='space-y-2 flex flex-col '
        >
          <div className='overflow-hidden'>
            {paymentState.modal ? (
              <div className='w-full gap-4 pb-4 h-full flex flex-col justify-center items-center'>
                <Parr>
                  {paymentState.state
                    ? 'Se esta procesando el Pago'
                    : 'Hubo un error en el pago'}
                </Parr>
                <span className='text-[#666666]'>Cod: {paymentState.msg}</span>
                <div className='w-[20%]'>
                  <img
                    src={paymentState.state ? loadingPaySVG : errorSVG}
                    alt=''
                  />
                </div>
                {!paymentState.state && (
                  <Button
                    className='bg-ph_color_1 mt-3 h-10 w-full'
                    onClick={goBack}
                  >
                    Volver
                  </Button>
                )}
              </div>
            ) : null}
            <div style={{ display: paymentState.modal ? 'none' : 'block' }}>
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
