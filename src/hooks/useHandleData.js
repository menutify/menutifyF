import { useState } from 'react'

function useHandleData(defaultData = {}) {
  const [data, setData] = useState(defaultData)
  const handleDataForm = (e) => {
    if (e.target.name === 'name') {
      e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '')
    }
    setData({ ...data, [e.target.name]: e.target.value })
    
  }
  return [data, handleDataForm]
}

export default useHandleData
