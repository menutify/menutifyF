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
import helpSVG from '@/assets/sidebar/help.svg'
import { useDataGlobalContext } from '../Context/GlobalContext'
import callAPI from '../utils/callApi'
import { routesApi, routesPath } from '../data/routes'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import Text from '@/Components/my/Text'
import { ArrowRight } from 'lucide-react'
import { Separator } from '@/Components/ui/separator'
import Label1 from '@/Components/my/Label1'
import pointsvg from '@/assets/sidebar/points.svg'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/Components/ui/dropdown-menu'
import Parr1 from '@/Components/my/Parr1'

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
              src={restaurant.logo_url || shopSVG}
              alt=''
            />
          </div>
          <div className='flex flex-col justify-center pt-1'>
            <Parr1 className='truncate font-semibold '>
              {restaurant.name || 'Mi restaurante'}
            </Parr1>
            <Label1 className='font-extralight tracking-widest'>
              Restaurante
            </Label1>
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
      <Separator className='bg-ph_color_1' />
      <SidebarFooter className='h-[80px] flex-row items-center p-4 px-5 w-full '>
        <div className='h-full w-full flex gap-3 flex-1'>
          <div className='h-full w-[50px]  rounded-xl overflow-auto '>
            <img
              className='h-full rounded-xl'
              src={restaurant.logo_url ? restaurant.logo_url : shopSVG}
              alt=''
            />
          </div>
          <div className='flex flex-col justify-center gap-1'>
            <Parr1 className='font-semibold'>Angel Navas</Parr1>
            <div className='flex justify-start items-center px-1.5 border border-ph_color_1 gap-2 rounded-sm h-5 w-[80px]'>
              <span className='w-[2px] h-[2px] bg-green-400 block rounded-full'></span>{' '}
              <label className='text-[8px] font-thin tracking-widest flex-complete'>
                Menutify PRO
              </label>{' '}
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className='h-[15px] cursor-pointer w-[15px] p-0 select-none focus:outline-none'>
            <div className='h-full w-full rounded-xl overflow-auto select-none'>
              <img className='h-full w-full rounded-xl select-none' src={pointsvg} alt='' />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-bg_color_1 cursor-pointer border-ph_color_1'>
            <DropdownMenuItem
              className='text-red-600 bg-bg_color_1 cursor-pointer flex-complete'
              onClick={logOut}
            >
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
