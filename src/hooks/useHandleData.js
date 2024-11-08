import { useState } from 'react'

const onlyTextValidation = (value) => {
  const newValue = value.replace(/[^a-zA-Z\s]/g, '')
  return newValue
}

const lengthValidation = (value, len) => {
  if (value.length > len) {
    return false
  }
  return true
}

function useHandleData(defaultData = {}) {
  const [data, setData] = useState(defaultData)

  const handleDataForm = (e) => {
    const nameContainer = e.target.name
    const valueContainer = e.target.value

    if (nameContainer === 'name') {
      if (!lengthValidation(valueContainer, 35)) {
        return
      }
      e.target.value = onlyTextValidation(valueContainer)
    }

    if (nameContainer === 'nameShop') {
      if (!lengthValidation(valueContainer, 35)) {
        return
      }
    }

    // Validación para el campo "phone" (solo números)
    if (nameContainer === 'phone') {
      // Filtrar solo números
      e.target.value = valueContainer.replace(/[^0-9]/g, '')

      // Opcional: Limitar el número de dígitos (ejemplo: 15)
      if (!lengthValidation(valueContainer, 15)) {
        return
      }
    }

    if (nameContainer === 'code') {
      const value = e.target.selectedOptions[0].attributes.value.nodeValue
      const emoji = e.target.selectedOptions[0].attributes.emoji.nodeValue
      setData({ ...data, ['emoji']: emoji, [e.target.name]: value })
      return
    }

    console.log({ dataInputs: data })
    setData({ ...data, [e.target.name]: e.target.value })
  }
  return [data, handleDataForm]
}

export default useHandleData
