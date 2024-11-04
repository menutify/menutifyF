import { useState } from 'react'

function useHandleData(defaultData) {
  const [data, setData] = useState(defaultData)
  const handleDataForm = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  return [ data,handleDataForm ]
}

export default useHandleData
