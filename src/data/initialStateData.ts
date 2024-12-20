import { Categories, Menu, Restaurant } from '@/types'
import foodSVG from '@/assets/createMenu/food.svg'

export const restaurantInicialData: Restaurant = {
  id: -1,
  name: '',
  desc: '',
  address: '',
  number: '',
  currency: 'ARS',
  send_method: '',
  hour: ['00:00', '00:00'],
  days: [],
  logo_url: '',
  state: true,
  changed: false
}

export const menuInitialData: Menu = {
  id: -1,
  id_restaurant: -1,
  f_color: false,
  s_color: '#FF5733',
  domain: '',
  header_url: '',
  state: false,
  changed: false
}

export const categorieInitialData: Categories[] = [
  {
    id: 1,
    pos: 0,
    id_menu: 1,
    details: {
      name: 'Padre 1',
      foods: [
        {
          id: 0,
          id_cat: 1,
          state: true,
          pos: 0,
          foodDetail: {
            img: foodSVG,
            price: 123,
            name: 'AAAAAA',
            star: false,
            desc: '',
            id: 0,
            id_food: 0
          }
        },
        {
          id: 1,
          id_cat: 1,
          state: true,
          pos: 1,
          foodDetail: {
            img: foodSVG,
            price: 123,
            name: 'ASDSFDS',
            star: false,
            desc: '',
            id: 1,
            id_food: 1
          }
        },
        {
          id: 2,
          id_cat: 1,
          pos: 2,
          state: true,
          foodDetail: {
            img: foodSVG,
            price: 123,
            name: 'BFSD',
            star: false,
            desc: '',
            id: 2,
            id_food: 2
          }
        }
      ]
    }
  },
  {
    id: 2,
    pos: 1,
    id_menu: 1,
    details: {
      name: 'Padre 2',
      foods: [
        {
          id: 3,
          id_cat: 2,
          pos: 0,
          state: true,
          foodDetail: {
            img: foodSVG,
            price: 123,
            name: 'CCSADSAD',
            star: false,
            desc: '',
            id: 3,
            id_food: 3
          }
        },
        {
          id: 4,
          id_cat: 2,
          pos: 1,
          state: true,
          foodDetail: {
            img: foodSVG,
            price: 123,
            name: 'ACSC',
            star: false,
            desc: '',
            id: 4,
            id_food: 4
          }
        }
      ]
    }
  },
  {
    id: 3,
    pos: 2,
    id_menu: 1,
    details: {
      name: 'Padre 3',
      foods: [
        {
          id: 5,
          id_cat: 3,
          pos: 0,
          state: true,
          foodDetail: {
            img: foodSVG,
            price: 123,
            name: 'CSDSDS',
            star: false,
            desc: '',
            id: 5,
            id_food: 5
          }
        }
      ]
    }
  },
  {
    id: 4,
    pos: 3,
    id_menu: 1,
    details: { name: 'Padre 4', foods: [] }
  }
]
