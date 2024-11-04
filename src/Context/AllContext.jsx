import Context from './GlobalContext'

// eslint-disable-next-line react/prop-types
const AllContext = ({ children }) => {
  const data = 'verde'

  return <Context.Provider value={data}>{children}</Context.Provider>
}

export default AllContext
