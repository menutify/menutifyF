import { AppContextType } from '@/types'
import { createContext, useContext } from 'react'

export const Context = createContext<AppContextType | object>({})

export const useDataGlobalContext = () => {
  const data = useContext(Context) as AppContextType
  return data
}
