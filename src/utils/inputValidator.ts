import { z } from 'zod'

const msg = {
  minCaracter: 'Contraseña debe contener mas de 4 caracteres',
  noStartWSpace: 'No debe iniciar con espacios',
  noSpace: 'no debe contener espacios'
}

export const emailValidator = z
  .string()
  .email('Debe ser un correo valido')
  .trim()
  .min(8, { message: msg.minCaracter })
  .trim()
  .refine((e) => !/\s/.test(e), { message: msg.noSpace })

export const usernameValidator = z
  .string()
  .trim()
  .min(4, { message: msg.minCaracter })
  .trim()
  .refine((e) => !/\s/.test(e), { message: msg.noSpace })

export const passwordValidator = z
  .string()
  .min(6, { message: 'Debe tener al menos 6 caracteres.' }) // Mínimo 6 caracteres
  .regex(/^[A-Z]/, { message: 'Debe comenzar con una letra mayúscula.' }) // Comenzar con mayúscula
  .regex(/\d/, { message: 'Debe contener al menos un número.' }) // Contener al menos un número
  .regex(/[^\w\s]/, { message: 'Debe contener al menos un símbolo.' })
  .regex(/^\S*$/, { message: 'No puede contener espacios.' })

