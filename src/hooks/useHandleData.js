import { useState } from 'react'

const onlyTextValidation = (value) => {
  const newValue = value
    .replace(/[^a-zA-Z\s]/g, '') //solo letras y espacios
    .replace(/\s+/g, ' ') //solo un espacio entre letars
    // .trim() //no espacios en el inicio o final
  return newValue
}

const lengthValidation = (value, len) => {
  if (value.length > len) {
    return false
  }
  return true
}

/**
 * Obtiene y organiza los datos de los elementos input y select.
 *
 * @param {data} object - Objeto que contiene keys para cada input y select.
 * @returns {Array.<(object|function)>} [object,function]
 * - Array con dos elementos:
 *   - Primer elemento (data): Un objeto que contiene los datos organizados de los inputs.
 *   - Segundo elemento (setData): Una función para actualizar o manejar el objeto `data`.
 */
function useHandleData(defaultData = {}) {
  const [data, setData] = useState(defaultData)

  const handleDataForm = (e) => {
    if (e.target.name === 'password') {
      e.target.value = e.target.value.replace(/\s/g, '').trim()
    }

    if (e.target.name === 'name') {
      if (!lengthValidation(e.target.value, 35)) {
        return
      }
      e.target.value = onlyTextValidation(e.target.value)
    }

    if (e.target.name === 'nameShop') {
      if (!lengthValidation(e.target.value, 35)) {
        return
      }
      e.target.value = e.target.value.replace(/\s+/g, ' ') 
    }

    // Validación para el campo "phone" (solo números)
    if (e.target.name === 'phone') {
      // Filtrar solo números
      e.target.value = e.target.value.replace(/[^0-9]/g, '').trim()

      // Opcional: Limitar el número de dígitos (ejemplo: 15)
      if (!lengthValidation(e.target.value, 15)) {
        return
      }
    }

    if (e.target.name === 'code') {
      const value = e.target.selectedOptions[0].attributes.value.nodeValue
      const emoji = e.target.selectedOptions[0].attributes.emoji.nodeValue
      setData({ ...data, ['emoji']: emoji, [e.target.name]: value.trim() })
      return
    }

    // console.log({ dataInputs: data })
    setData({ ...data, [e.target.name]: e.target.value })
  }
  return [data, handleDataForm]
}

export default useHandleData
