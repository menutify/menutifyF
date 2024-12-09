import { number, z } from 'zod'

const msg = {
  minCaracter: 'Contraseña debe contener mas de 4 caracteres',
  noStartWSpace: 'No debe iniciar con espacios',
  noSpace: 'no debe contener espacios',
  noNumbers: 'No dedbe contener numeros',
  min8Caracter: 'Debe contener mas de 8 caracteres'
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

export const nameValidator = z
  .string()
  .trim()
  .min(8, { message: msg.min8Caracter })
  .trim()
  .refine((e) => !/\d/.test(e), { message: msg.noNumbers })

export const phoneValidator = z
  .string()
  .trim()
  .min(10, { message: 'El número de teléfono debe tener al menos 10 dígitos.' })
// .regex(/^\d{3}-\d{3}-\d{4}$/, {
//   message: 'El número de teléfono debe seguir el formato XXX-XXX-XXXX.',
// })

export const dniValidator = z
  .string()
  .regex(/^\d+$/, { message: 'El DNI debe contener solo números' }) // Asegura que el DNI contiene solo números
  .length(8, { message: 'Debe contener exactamente 8 dígitos' })

export const domainValidator = z
  .string()
  .min(5, { message: 'Debe tener al menos 5 caracteres.' })
  .max(25, { message: 'Debe tener menos de 25 caracteres.' })
  .regex(/^\S*$/, { message: 'No puede contener espacios.' })
  .trim()
