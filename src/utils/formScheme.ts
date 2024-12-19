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
    .regex(/^\d{1,13}(\.\d{1,2})?$/, {
      message:
        'El precio puede tener hasta 13 dígitos enteros y 2 decimales, sin espacios'
    }) // Asegura enteros hasta 13 dígitos y opcionales 2 decimales
    .min(1, { message: 'Debe colocar el precio' }) // No acepta vacío
    .refine((value) => !/\s/.test(value), {
      message: 'El precio no debe contener espacios'
    }) // Verifica que no haya espacios // No acepta vacío
})
