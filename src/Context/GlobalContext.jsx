import { createContext, useContext } from 'react'

export const Context = createContext(null)

export const useDataGlobalContext = () => {
  const data = useContext(Context)
  return data
}


