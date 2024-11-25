import { z } from 'zod'
import { emailValidator, passwordValidator } from './inputValidator'

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

export const caAccountFormScheme = z.object({
  email: emailValidator,
  password: passwordValidator,
  repassword: z.string()
}).refine((data) => data.password === data.repassword, {
  message: 'Las contraseñas no coinciden',
  path: ['repassword']
})
