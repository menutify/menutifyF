import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/Components/ui/form'
import { Input } from '@/Components/ui/input'
import useFormHook from '@/hooks/useFormHook'
import { z } from 'zod'
import { Button } from '@/Components/ui/button'
import { perfilFormScheme } from '@/utils/formScheme'
import lapizSVG from '@/assets/all/pen.svg'
import { useEffect, useState } from 'react'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import type { Perfil } from '@/types'
import HandleFormSubmit from '@/utils/handleForSubmit'

const initialState = {
  name: false,
  phone: false,
  password: false
}

function Perfil() {
  const { perfil } = useDataGlobalContext()
  const { handlePatchSubmit } = HandleFormSubmit()
  const [inputEditable, setInputEditable] = useState(initialState)
  const initialPerfilData = {
    email: '',
    password: '',
    repassword: '',
    phone: '',
    name: '',
    country: ''
  }

  useEffect(() => {
    form.reset({
      ...perfil,
      password: 'MiContr4seña.',
      repassword: 'MiContr4seña.'
    })
  }, [perfil])

  const form = useFormHook(perfilFormScheme, initialPerfilData)

  function formatPhoneNumber(value: string) {
    const cleaned = value.replace(/\D/g, '') // Quita caracteres no numéricos
    const match = cleaned.match(/^(\d{1,3})(\d{1,3})?(\d{1,4})?$/)

    if (match) {
      const part1 = match[1] || ''
      const part2 = match[2] ? `${match[2]}` : ''
      const part3 = match[3] ? `${match[3]}` : ''
      const text = `${part1}${part2}${part3}`
      return text //esto es lo que se muestra en el input
    }

    // return value
    return value.slice(0, -1)
  }

  async function onSubmit(values: z.infer<typeof perfilFormScheme>) {
    setInputEditable(initialState)
    console.log(values)
    console.log(perfil)
    const { name, password, repassword, phone } = values

    if (
      name == perfil.name &&
      password == 'MiContr4seña.' &&
      repassword == 'MiContr4seña.' &&
      phone == perfil.phone
    ) {
      return
    }

    if (password !== repassword) {
      return
    }

    if (repassword != 'MiContr4seña.') {
      const data = await handlePatchSubmit(
        '/user' + `?token=${localStorage.getItem('token')}`,
        { name, password, phone }
      )

      if (!data) {
        return
      }
    } else {
      const data = await handlePatchSubmit(
        '/user' + `?token=${localStorage.getItem('token')}`,
        { name, phone }
      )

      if (!data) {
        return
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='px-[20px]'>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <div className='flex-complete gap-[20px]'>
                  <Input
                    placeholder='Nombre completo'
                    type='text'
                    {...field}
                    disabled={!inputEditable.name && true}
                    className={`border-transparent border-b-gray-300 ${
                      inputEditable.name && 'border-gray-300'
                    }`}
                  />
                  <span
                    className='w-5 cursor-pointer'
                    onClick={() =>
                      setInputEditable({ ...initialState, name: true })
                    }
                  >
                    <img src={lapizSVG} />
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'phone'}
          render={({ field }) => (
            <FormItem className='px-[20px]'>
              <FormLabel>Télefono</FormLabel>
              <FormControl>
                <div className='flex-complete gap-[20px]'>
                  <Input
                    {...field}
                    type='tel'
                    placeholder='1234567890'
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(formatPhoneNumber(e.target.value))
                    }
                    disabled={!inputEditable.phone && true}
                    className={`border-transparent border-b-gray-300 ${
                      inputEditable.phone && 'border-gray-300'
                    }`}
                  />
                  <span
                    className='w-5 cursor-pointer'
                    onClick={() =>
                      setInputEditable({ ...initialState, phone: true })
                    }
                  >
                    <img src={lapizSVG} />
                  </span>
                </div>
              </FormControl>

              <FormMessage className='mt-0 pt-0' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='px-[20px]'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className='flex-complete gap-[20px]'>
                  <Input
                    placeholder='example@email.com'
                    type='email'
                    {...field}
                    disabled={true}
                    className={`border-transparent border-b-gray-300 `}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='country'
          render={({ field }) => (
            <FormItem className='px-[20px]'>
              <FormLabel>País</FormLabel>
              <FormControl>
                <div className='flex-complete gap-[20px]'>
                  <Input
                    placeholder='Argentina'
                    type='text'
                    {...field}
                    disabled={true}
                    value={'Argentina'}
                    className={`border-transparent border-b-gray-300 `}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='px-[20px]'>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <div className='flex-complete gap-[20px]'>
                  <Input
                    placeholder='●●●●●●●●●●●●●●'
                    type='password'
                    {...field}
                    disabled={!inputEditable.password && true}
                    className={`border-transparent border-b-gray-300 ${
                      inputEditable.password && 'border-gray-300'
                    }`}
                  />
                  <span
                    className='w-5 cursor-pointer'
                    onClick={() =>
                      setInputEditable({ ...initialState, password: true })
                    }
                  >
                    <img src={lapizSVG} />
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='repassword'
          render={({ field }) => (
            <FormItem
              className={`px-[20px] hidden ${
                inputEditable.password && 'block'
              }`}
            >
              <FormLabel>Repetir contraseña</FormLabel>
              <FormControl>
                <Input
                  placeholder='●●●●●●●●●●●●●●'
                  type='password'
                  {...field}
                  disabled={!inputEditable.password && true}
                  className={`border-transparent border-b-gray-300 ${
                    inputEditable.password && 'border-gray-300'
                  }`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='mx-[20px]'>
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default Perfil
