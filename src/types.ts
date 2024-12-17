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
  menu: Menu
  setMenu: React.Dispatch<React.SetStateAction<Menu>>
  setApiPetition: React.Dispatch<React.SetStateAction<boolean>>
  apiPetition: boolean
}

export interface CreateMenuContextType {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

export interface User {
  id: string | null
  isNew: boolean | null
  email: string | null
  subActive: boolean | null
}

export interface Restaurant {
  id: number
  name: string
  desc: string
  address: string
  number: string
  currency: string
  send_method: string
  hour: string[]
  days: number[]
  logo_url: string
  state: boolean
  changed: boolean
}

export interface Menu {
  id: number
  id_restaurant: number
  f_color: boolean
  s_color: string
  domain: string
  header_url: string
  state: boolean
  changed: boolean
}

export interface handleSubmit {
  path: string

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
  pos: number
  details: CategoriesDetails
}

export interface Categories2 {
  id: number
  id_menu: number
  pos: number
  foodDetail: CategoriesDetails
}

export interface CategoriesDetails {
  id?: number
  id_cat?: number
  name: string
  desc?: string
  foods: Food[]
}

export interface Food {
  id: number
  id_cat: number
  state: boolean
  pos: number
  foodDetail: FoodDetails
}

export interface FoodDetails {
  id: number
  id_food: number
  desc?: string
  star: boolean | string
  name: string
  img: string
  price: number
}
