import { Outlet } from 'react-router-dom'
import { AppSidebar } from './AppSidebar'
import { SidebarProvider, SidebarTrigger } from '../Components/ui/sidebar'
import { useEffect } from 'react'
import callAPI from '../utils/callApi'
import { routesApi } from '../data/routes'
import { useDataGlobalContext } from '../Context/GlobalContext'
import MenuContext from '@/Context/createMenuContext'

function Dashboard() {
  const { setMenu, setRestaurant, restaurant, setCategories } =
    useDataGlobalContext()

  useEffect(() => {
    const getDataRestaurant = async () => {
      const { data, error, msg } = await callAPI.getData(routesApi.restaurant)
      if (error) {
        alert(msg)
        return
      }

      const { respRest, respMenu } = data

      setRestaurant({
        ...respRest
      })

      setMenu({
        ...respMenu,
        s_color: respMenu.s_color === '' ? '#FF5733' : respMenu.s_color
      })

      if (respMenu.id) {
        console.log(respMenu.id)
        const { data, error, msg } = await callAPI.getData(
          `${routesApi.catCascade}/${respMenu.id}`
        )
        if (error) {
          alert(msg)
          return
        }

        const changeArray = data.allCategories.map((value) => {
          const { food, categoriesDetail, ...alldata } = value

          return {
            ...alldata,
            details: { ...categoriesDetail, foods: [...food] }
          }
        })

        console.log({ changeArray })

        setCategories(changeArray)
      }
    }

    if (restaurant.id === -1) {
      getDataRestaurant()
    }
  }, [])

  return (
    <SidebarProvider
      style={{
        '--sidebar-width': '14rem'
      }}
    >
      <AppSidebar />
      <SidebarTrigger className='  fixed top-0 left-0 sm:bg-white z-50 md:z-0 sm:w-10 w-full bg-sb_bg flex rounded-none justify-start h-[4.5rem] hover:bg-sb_bg ' />
      <MenuContext>
        <div className='bg-white w-full min-h-full'>
          <Outlet />
        </div>
      </MenuContext>
    </SidebarProvider>
  )
}

export default Dashboard
