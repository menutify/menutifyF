import { Outlet } from 'react-router-dom'
import { AppSidebar } from './AppSidebar'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar'

function Dashboard() {
  return (
    <SidebarProvider
      style={{
        '--sidebar-width': '14rem'
      }}
    >
      <AppSidebar />

      <SidebarTrigger  className=' fixed top-0 left-0 sm:bg-white z-50 md:z-0 sm:w-10 w-full bg-sb_bg flex rounded-none justify-start h-[4.5rem] hover:bg-sb_bg ' />

      <div className='bg-white w-full min-h-full'>
        <Outlet />
      </div>
    </SidebarProvider>
  )
}

export default Dashboard
