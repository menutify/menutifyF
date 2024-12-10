import { Outlet } from 'react-router-dom'
import { AppSidebar } from './AppSidebar'
import { SidebarProvider, SidebarTrigger } from '../Components/ui/sidebar'
import { useEffect } from 'react'
import callAPI from '../utils/callApi'
import { routesApi } from '../data/routes'
import { useDataGlobalContext } from '../Context/GlobalContext'

function Dashboard() {
  const { restaurant, setRestaurant } = useDataGlobalContext()

  useEffect(() => {
    const getDataRestaurant = async () => {
      const { data, error, msg } = await callAPI.getData(routesApi.restaurant)
      if (error) {
        alert(msg)
        return
      }

      const { respRest } = data
      setRestaurant({
        ...respRest,
        domain: respRest.domain == null ? respRest.id : respRest.domain,
        state: !respRest.address || !respRest.currency ? 0 : 1,
        s_color: respRest.s_color == '' ? '#FF5733' : respRest.s_color
      })
    }

    getDataRestaurant()
  }, [])

  return (
    <SidebarProvider
      style={{
        '--sidebar-width': '14rem'
      }}
    >
      <AppSidebar />
      <SidebarTrigger className='  fixed top-0 left-0 sm:bg-white z-50 md:z-0 sm:w-10 w-full bg-sb_bg flex rounded-none justify-start h-[4.5rem] hover:bg-sb_bg ' />

      <div className='bg-white w-full min-h-full'>
        <Outlet />
      </div>
    </SidebarProvider>
  )
}

export default Dashboard
