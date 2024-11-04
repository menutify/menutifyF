import { useContext } from 'react'
import Context from '../Context/GlobalContext'

// Hook personalizado para acceder al contexto
const useDataContext = () => {
  const data = useContext(Context)
  return data
}

export default useDataContext
