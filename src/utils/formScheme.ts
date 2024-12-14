import { z } from 'zod'
import {
  checkValidator,
  descValidator,
  domainValidator,
  emailValidator,
  nameFoodValidator,
  nameValidator,
  passwordValidator,
  phoneValidator
} from './inputValidator'
import { start } from 'repl'

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
    check: checkValidator
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

export const nameMethodValidator = z.object({
  name: nameFoodValidator
})

export const categoriesScheme = z.object({
  name: nameFoodValidator,
  desc: descValidator
})

export const createFoodScheme = z.object({
  name: nameFoodValidator,
  cat: z.string().min(1, { message: 'debe seleccionar una categoria' }),
  desc: descValidator,
  star: z.boolean().default(false),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: 'Solo puede contener 2 decimales' }) // Asegura que el DNI contiene solo números
    .min(1, { message: 'Debe colocar el precio' })
    .max(15, { message: 'El maximo son 15 caracteres' })
})
