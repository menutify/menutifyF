import { z } from 'zod'
import {
  domainValidator,
  emailValidator,
  nameValidator,
  passwordValidator,
  phoneValidator
} from './inputValidator'

export const loginFormScheme = z.object({
  email: emailValidator,
  password: passwordValidator
})

export const repasswordFormScheme = z.object({
  email: emailValidator
})

export const repasswordConfirmFormScheme = z
  .object({
    password: passwordValidator,
    repassword: z.string()
  })
  .refine((data) => data.password === data.repassword, {
    message: 'Las contraseñas no coinciden',
    path: ['repassword']
  })

export const caAccountFormScheme = z
  .object({
    name: nameValidator,
    phone: phoneValidator,
    email: emailValidator,
    password: passwordValidator,
    repassword: z.string(),
    check: z
      .boolean()
      .default(false)
      .refine((val) => val === true, {
        message: 'Aceptar los terminos y condiciones'
      })
  })
  .refine((data) => data.password === data.repassword, {
    message: 'Las contraseñas no coinciden',
    path: ['repassword']
  })

export const caPaymentFormScheme = z.object({
  email: emailValidator
})

export const restaurantAddress = z.object({
  address: z.string().trim().min(12, { message: 'minimo 12 caracteres' }).trim()
})

export const restaurantNumber = z.object({
  number: phoneValidator
})

export const restaurantSendMethod = z.object({
  send_method: nameValidator
})

export const domainMethod = z.object({
  domain: domainValidator
})
