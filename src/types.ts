import { ReactNode } from 'react'

export interface ReactComponent {
  children: ReactNode
}

export interface AppContextType {
  charge: boolean
  setCharge: React.Dispatch<React.SetStateAction<boolean>>
  marginTop: number
  setMarginTop: React.Dispatch<React.SetStateAction<number>>
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  product: object
  setProduct: React.Dispatch<React.SetStateAction<object>>
}

export interface User {
  id: number | null
  isNew: boolean | null
  email: string | null
  subActive: boolean | null
}

export interface handleSubmit {
  path: string
  body: Record<string, any>
  header: Record<string, string>
}
