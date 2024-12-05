import { useState } from 'react'
import { Context } from './GlobalContext'
import { ReactComponent, User } from '@/types'

const AllContext = ({ children }: ReactComponent) => {
  const [user, setUser] = useState<User>({
    id: null,
    isNew: null,
    email: null,
    subActive: null
  })
  const [product, setProduct] = useState({})
  const [marginTop, setMarginTop] = useState(0)
  const [loading, setLoading] = useState(false)
  const options = {
    loading,
    setLoading,
    marginTop,
    setMarginTop,
    user,
    setUser,
    product,
    setProduct
  }

  return <Context.Provider value={options}>{children}</Context.Provider>
}

export default AllContext
