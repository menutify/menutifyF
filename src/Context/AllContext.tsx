import { useState } from 'react'
import { Context } from './GlobalContext'
import { Categories, Menu, ReactComponent, Restaurant, User } from '@/types'
import { categorieInitialData, menuInitialData, restaurantInicialData } from '@/data/initialStateData'

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
  const [restaurant, setRestaurant] = useState<Restaurant>(
    restaurantInicialData
  )
  const [menu, setMenu] = useState<Menu>(menuInitialData)
  const [portalVisible, setPortalVisible] = useState(false)
  const [categories, setCategories] = useState<Categories[]>(categorieInitialData)
  const [apiPetition, setApiPetition] = useState(false)
  const options = {
    loading,
    setLoading,
    marginTop,
    setMarginTop,
    user,
    setUser,
    product,
    setProduct,
    restaurant,
    setRestaurant,
    categories,
    setCategories,
    menu,
    setMenu,
    portalVisible,
    setPortalVisible,
    setApiPetition,
    apiPetition
  }

  return <Context.Provider value={options}>{children}</Context.Provider>
}

export default AllContext
