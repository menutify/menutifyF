import { AppContextType, CreateMenuContextType } from '@/types'
import { createContext, useContext } from 'react'

export const Context = createContext<AppContextType | object>({})

export const useDataGlobalContext = () => {
  const data = useContext(Context) as AppContextType
  return data
}

export const CreateMenuContext = createContext<CreateMenuContextType | object>(
  {}
)

export const useMenuContext = () => {
  const data = useContext(CreateMenuContext) as CreateMenuContextType
  return data
}
