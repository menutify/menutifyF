import { Outlet } from 'react-router-dom'
import { AppSidebar } from './AppSidebar'
import { SidebarProvider, SidebarTrigger } from '../Components/ui/sidebar'
import { useEffect } from 'react'
import callAPI from '../utils/callApi'
import { routesApi } from '../data/routes'
import { useDataGlobalContext } from '../Context/GlobalContext'
import MenuContext from '@/Context/createMenuContext'
import { createPortal } from 'react-dom'
import RestaurantDataModal from './layouts/RestaurantDataModal'

function Dashboard() {
  const {
    setMenu,
    setRestaurant,
    setSubDetails,
    restaurant,
    setCategories,
    setPerfil
  } = useDataGlobalContext()

  useEffect(() => {
    const token = localStorage.getItem('token')

    const handleApiError = (error, msg) => {
      if (error) {
        alert(msg)
        return true
      }
      return false
    }

    const getDataRestaurant = async () => {
      const { data, error, msg } = await callAPI.getData(
        routesApi.restaurant + `?token=${token}`
      )
      if (handleApiError(error, msg)) return

      const { respRest, respMenu } = data

      setRestaurant({
        ...respRest
      })

      setMenu({
        ...respMenu,
        s_color: respMenu.s_color || '#FF5733'
      })

      if (respMenu.id) {
        // console.log(respMenu.id)
        const {
          data: catData,
          error: catError,
          msg: catMsg
        } = await callAPI.getData(`${routesApi.catCascade}/${respMenu.id}`)
        if (handleApiError(catError, catMsg)) return

        // const changeArray = data.allCategories.map((value) => {
        //   const { food, categoriesDetail, ...alldata } = value

        //   return {
        //     ...alldata,
        //     details: { ...categoriesDetail, foods: [...food] }
        //   }
        // })
        const changeArray = catData.allCategories.map(
          ({ food, categoriesDetail, ...alldata }) => ({
            ...alldata,
            details: { ...categoriesDetail, foods: [...food] }
          })
        )

        setCategories(changeArray)
      }
    }

    const getDataFromPerfil = async () => {
      // console.log(routesApi)
      const { data, error, msg } = await callAPI.getData(
        '/user' + `?token=${token}`
      )

      if (handleApiError(error, msg)) return

      const { userData } = data
      const { email, name, password, phone, country } = userData

      setPerfil({ email, name, password, phone, country, repassword: password })
      // console.log(userData)
    }

    // if (restaurant.id === -1) {
    //   getDataRestaurant()
    //   getDataFromPerfil()
    // }

    const getSubDetails = async () => {
      const { data, error, msg } = await callAPI.getData(
        '/sub' + `?token=${token}`
      )

      if (handleApiError(error, msg)) return

      // console.log(data)
      const { f_date, c_date, state } = data

      const calculateDaysDifference = (date1: string) => {
        // Convierte la segunda fecha
        const finishDate = new Date(date1).getTime()
        const nowDate = new Date().getTime()
        if (isNaN(nowDate) || isNaN(finishDate)) {
          throw new Error('Invalid date format')
        }
        const diffInMs = finishDate - nowDate // Diferencia en milisegundos
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24) // Convertir a días
        return diffInDays
      }

      const daysResult = Math.floor(calculateDaysDifference(f_date))

      setSubDetails({ c_date, f_date, state, days: daysResult })
    }

    const fetchAllData = async () => {
      if (restaurant.id === -1) {
        await Promise.all([
          getDataRestaurant(),
          getDataFromPerfil(),
          getSubDetails()
        ])
      }
    }

    fetchAllData()
  }, [])

  return (
    <SidebarProvider
      className={`dark relative ${
        !restaurant.state && 'blur-[1.5px] overflow-y-hidden'
      }`}
      style={
        {
          '--sidebar-width': '20rem',
          '--sidebar-width-mobile': '22rem'
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarTrigger className='fixed top-0 left-0 md:bg-white z-50 md:z-0 md:w-10 w-full bg-sb_bg flex rounded-none justify-start h-[4.5rem] hover:bg-sb_bg ' />
      <MenuContext>
        <div className='bg-white w-full min-h-full md:mt-0 ligth'>
          <div className='flex h-[72px] md:hidden'></div>
          <Outlet />
          <div className='flex h-[72px] md:hidden'></div>
        </div>
      </MenuContext>
      {!restaurant.state && (
        <div className='fixed top-0 left-0 w-full h-full flex-complete z-40 block ligth'></div>
      )}
      {!restaurant.state &&
        createPortal(
          <div className='fixed top-0 left-0 w-full h-full flex-complete z-50 block'>
            <RestaurantDataModal className='w-2/3 min-w-[300px] max-w-[1200px]' />
          </div>,
          document.body
        )}
    </SidebarProvider>
  )
}

export default Dashboard
