import { useState } from 'react'
import { Context } from './GlobalContext'
import { ReactComponent, Restaurant, User } from '@/types'
import { restaurantInicialData } from '@/data/initialStateData'

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
  const [categories, setCategories] = useState([
    { id: 1, name: 'Padre 1', depth: 0 },
    { id: 2, name: 'Padre 2', depth: 0 },
    { id: 3, name: 'Padre 3', depth: 0 }
  ])

  const [foods, setFoods] = useState([
    { id: 'a', parentId: 1, name: 'Hijo 1', pos: 0 },
    { id: 'b', parentId: 1, name: 'Hijo 2', pos: 1 },
    { id: 'c', parentId: 1, name: 'Hijo 3', pos: 2 },
    { id: 'd', parentId: 2, name: 'Hijo 4', pos: 0 },
    { id: 'e', parentId: 2, name: 'Hijo 5', pos: 1 },
    { id: 'f', parentId: 3, name: 'Hijo 6', pos: 0 }
  ])

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
    setCategories,foods,setFoods
  }

  return <Context.Provider value={options}>{children}</Context.Provider>
}

export default AllContext
