import { useState } from 'react'
import { Context } from './GlobalContext'
import { ReactComponent, User } from '@/types'

// eslint-disable-next-line react/prop-types
const AllContext = ({ children }: ReactComponent) => {
  const [user, setUser] = useState<User>({
    id: null,
    isNew: null,
    email: null,
    subActive: null
  })
  const [product, setProduct] = useState({})

  const options = {
    user,
    setUser,
    product,
    setProduct
  }

  return <Context.Provider value={options}>{children}</Context.Provider>
}

export default AllContext
