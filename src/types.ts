import { ReactNode } from 'react'

export interface ReactComponent {
  children: ReactNode
}

export interface AppContextType {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  marginTop: number
  setMarginTop: React.Dispatch<React.SetStateAction<number>>
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  product: object
  setProduct: React.Dispatch<React.SetStateAction<object>>
  restaurant: Restaurant
  setRestaurant: React.Dispatch<React.SetStateAction<Restaurant>>
  categories: Categories[]
  setCategories: React.Dispatch<React.SetStateAction<Categories[]>>
  foods: object[]
  setFoods: React.Dispatch<React.SetStateAction<object[]>>
}

export interface User {
  id: string | null
  isNew: boolean | null
  email: string | null
  subActive: boolean | null
}

export interface Restaurant {
  id: number | null
  address: string
  number: string
  currency: string
  send_method: string
  hour: string[]
  days: number[]
  f_color: boolean
  s_color: string
  domain: string
  logo_url: string
  header_url: string
  state: number
}

export interface handleSubmit {
  path: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: Record<string, any>
  header: Record<string, string>
}

export interface googleCredentials {
  clientId: string
  credential: string
  select_by: string
}

export interface Categories {
  id: number
  id_menu: number
  name: string
  pos: number
  foods: FoodOrderList[]
}

export interface FoodOrderList {
  id: number
  id_cat: number
  name: string
  img: string
  state:boolean
  price: number
  pos: number
}
