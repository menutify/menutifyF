import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/Components/ui/sidebar'
import menuSVG from '@/assets/sidebar/menu.svg'
import shopSVG from '@/assets/sidebar/shop1.svg'
import userSVG from '@/assets/sidebar/user.svg'
import logoutSVG from '@/assets/sidebar/logout.svg'
import helpSVG from '@/assets/sidebar/help.svg'
import { useDataGlobalContext } from '../Context/GlobalContext'
import callAPI from '../utils/callApi'
import { routesApi, routesPath } from '../data/routes'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import Text from '@/Components/my/Text'
import { ArrowRight } from 'lucide-react'

export function AppSidebar() {
  const { restaurant, setUser } = useDataGlobalContext()
  const [unEstado, setUnEstado] = useState(-1)
  const navigate = useNavigate()
  const location = useLocation()

  const logOut = async () => {
    setUser({
      id: null,
      isNew: null,
      email: null,
      subActive: null
    })
    await callAPI.getData(routesApi.logout)
    window.location.href = routesPath.login
  }

  useEffect(() => {
    const miPath = location.pathname
    console.log(miPath)
    if (miPath.startsWith('/dashboard/create')) setUnEstado(0)
    if (miPath.startsWith('/dashboard/restaurant')) setUnEstado(1)
  }, [])

  const items = useMemo(
    () => [
      [
        {
          title: 'Editar menú',
          url: routesPath.createMenu,
          ico: menuSVG,
          pos: 0
        },
        {
          title: 'Restaurante',
          url: routesPath.restaurant,
          ico: shopSVG,
          pos: 1
        }
      ],
      [
        {
          title: 'Cuenta',
          url:
            restaurant.state === true
              ? routesPath.account
              : routesPath.restaurant,
          ico: userSVG,
          pos: 2
        },
        {
          title: '¿Necesitas ayuda?',
          url:
            restaurant.state === true
              ? routesPath.account
              : routesPath.restaurant,
          ico: helpSVG,
          pos: 3
        }
      ]
    ],
    []
  )

  const selectNavFromSB = (url, pos) => {
    setUnEstado(pos)
    navigate(url)
  }

  return (
    <Sidebar>
      <SidebarHeader className='h-[80px] flex-complete p-4 px-5'>
        <div className='h-full w-full flex gap-3'>
          <div className='h-full  '>
            <img
              className='h-full rounded-xl'
              src={restaurant.logo_url ? restaurant.logo_url : shopSVG}
              alt=''
            />
          </div>
          <div className='flex flex-col justify-between'>
            <Text className='font-bold tracking-wider'>Angel's Pizzas</Text>
            <Text className='font-extralight tracking-widest'>Restaurante</Text>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarGroupLabel className='text-base text-gray-500 px-5'>
                Creación de menú
              </SidebarGroupLabel>
              {items[0].map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => selectNavFromSB(item.url, item.pos)}
                    asChild
                    size={'lg'}
                    className={`${
                      unEstado === item.pos ? 'bg-sidebar-accent' : ''
                    } focus:bg-red-500 selection:bg-red-50 rounded-none hover:rounded-none  hover:text-sb_text h-full relative select-none cursor-pointer py-0`}
                  >
                    <div className='w-full h-full flex justify-between items-center '>
                      <div className=' flex-complete gap-2 '>
                        <picture className=' w-5  flex-complete'>
                          <img src={item.ico} alt='' />
                        </picture>
                        <Text className='text-lg'>{item.title}</Text>
                      </div>
                      <span className='h-2/5 w-10 '>
                        {unEstado === item.pos && (
                          <ArrowRight className='h-full' />
                        )}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarGroupLabel className='text-base text-gray-500 px-5'>
                Ajustes
              </SidebarGroupLabel>
              {items[1].map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => selectNavFromSB(item.url, item.pos)}
                    asChild
                    size={'lg'}
                    className={`${
                      unEstado === item.pos ? 'bg-sidebar-accent' : ''
                    } focus:bg-red-500 selection:bg-red-50 rounded-none hover:rounded-none  hover:text-sb_text h-full relative select-none cursor-pointer py-0`}
                  >
                    <div className='w-full h-full flex justify-between items-center '>
                      <div className=' flex-complete gap-2 '>
                        <picture className=' w-5  flex-complete'>
                          <img src={item.ico} alt='' />
                        </picture>
                        <Text className='text-lg'>{item.title}</Text>
                      </div>
                      <span className='h-2/5 w-10 '>
                        {unEstado === item.pos && (
                          <ArrowRight className='h-full' />
                        )}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroupContent className='flex justify-end h-full flex-col overflow-hidden items-center '>
          <SidebarMenuButton
            asChild
            size={'lg'}
            className='hover:rounded-none hover:bg-sb_hover hover:text-sb_text relative '
          >
            <div>
              <picture className='h-full w-5'>
                <img src={logoutSVG} alt='' />
              </picture>
              <button
                onClick={logOut}
                className='px-0 text-start cursor-pointer  font-bold text-lg w-full'
              >
                <span>{'Cerrar Sesión'}</span>
              </button>
            </div>
          </SidebarMenuButton>
        </SidebarGroupContent>
      </SidebarFooter>
    </Sidebar>
  )
}
