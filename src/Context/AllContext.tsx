import { useState } from 'react'
import { Context } from './GlobalContext'
import { Categories, ReactComponent, Restaurant, User } from '@/types'
import { restaurantInicialData } from '@/data/initialStateData'
import foodSVG from '@/assets/createMenu/food.svg'

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
  const [portalVisible, setPortalVisible] = useState(false)
  const [categories, setCategories] = useState<Categories[]>([
    {
      id: 1,
      pos: 0,
      name: 'Padre 1',
      id_menu: 1,
      foods: [
        {
          id: 0,
          id_cat: 1,
          img: foodSVG,
          state: true,
          price: 123,
          name: 'Hijo 1',
          pos: 0
        },
        {
          id: 1,
          id_cat: 1,
          img: foodSVG,
          state: true,
          price: 123,
          name: 'Hijo 2',
          pos: 1
        },
        {
          id: 2,
          id_cat: 1,
          img: foodSVG,
          state: true,
          price: 123,
          name: 'Hijo 3',
          pos: 2
        }
      ]
    },
    {
      id: 2,
      pos: 1,
      name: 'Padre 2',
      id_menu: 1,
      foods: [
        {
          id: 3,
          id_cat: 2,
          img: foodSVG,
          state: true,
          price: 123,
          name: 'Hijo 4',
          pos: 0
        },
        {
          id: 4,
          id_cat: 2,
          img: foodSVG,
          state: true,
          price: 123,
          name: 'Hijo 5',
          pos: 1
        }
      ]
    },
    {
      id: 3,
      pos: 2,
      name: 'Padre 3',
      id_menu: 1,
      foods: [
        {
          id: 5,
          id_cat: 3,
          img: foodSVG,
          state: true,
          price: 123,
          name: 'Hijo 6',
          pos: 0
        }
      ]
    },
    {
      id: 4,
      pos: 3,
      name: 'Padre 4',
      id_menu: 1,
      foods: []
    }
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
    setCategories,
    foods,
    setFoods,portalVisible,setPortalVisible
  }

  return <Context.Provider value={options}>{children}</Context.Provider>
}

export default AllContext
