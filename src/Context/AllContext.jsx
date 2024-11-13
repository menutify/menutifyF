import { useState } from 'react'
import { Context } from './GlobalContext'

// eslint-disable-next-line react/prop-types
const AllContext = ({ children }) => {
  const [stripePromise, setStripePromise] = useState(null)
  const [user, setUser] = useState(null)
 

  const options = {
   
    stripePromise,
    setStripePromise,
    user,
    setUser
  }
  return <Context.Provider value={options}>{children}</Context.Provider>
}

export default AllContext
