import { useState } from 'react'
import { CreateMenuContext } from './GlobalContext'
import { ReactComponent } from '@/types'

function MenuContext({ children }: ReactComponent) {
  const [search, setSearch] = useState<string>('')

  const options = {
    search,
    setSearch
  }

  return (
    <CreateMenuContext.Provider value={options}>
      {children}
    </CreateMenuContext.Provider>
  )
}

export default MenuContext
