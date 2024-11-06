import { useState } from 'react'

function useHandleData(defaultData = {}) {
  const [data, setData] = useState(defaultData)
  const handleDataForm = (e) => {
    if (e.target.name === 'name') {
      e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '')
    }

    if (e.target.name === 'code') {
      const value = e.target.selectedOptions[0].attributes.value
      const emoji = e.target.selectedOptions[0].attributes.emoji.nodeValue
      console.log(emoji)
      setData({ ...data, ['emoji']: emoji, [e.target.name]: value })

      return
    }

    setData({ ...data, [e.target.name]: e.target.value })
  }
  console.log({ dataInputs: data })
  return [data, handleDataForm]
}

export default useHandleData
