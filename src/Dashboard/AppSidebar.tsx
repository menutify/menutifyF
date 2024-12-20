import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/Components/ui/sidebar'
import logoSVG from '@/assets/logo.svg'
import menuSVG from '@/assets/sidebar/menu.svg'
import addSVG from '@/assets/sidebar/add.svg'
import settingsSVG from '@/assets/sidebar/settings.svg'
import shopSVG from '@/assets/sidebar/shop1.svg'
import userSVG from '@/assets/sidebar/user.svg'
import logoutSVG from '@/assets/sidebar/logout.svg'
import crownSVG from '@/assets/sidebar/crown.svg'
import { Card } from '../Components/ui/card'
import Title2 from '../Components/my/Title2'
import Parr from '../Components/my/Parr'
import { Button } from '../Components/ui/button'
import { useDataGlobalContext } from '../Context/GlobalContext'
import callAPI from '../utils/callApi'
import { routesApi, routesPath } from '../data/routes'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'

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
    navigate(routesPath.login)
  }

  useEffect(() => {
    const miPath = location.pathname
    console.log(miPath)
    if (miPath.startsWith('/dashboard/create')) setUnEstado(1)
    if (miPath.startsWith('/dashboard/restaurant')) setUnEstado(3)
  }, [])

  

  const items = useMemo(
    () => [
      {
        title: 'Mis menús',
        url:
          restaurant.state === true
            ? routesPath.seeMenu
            : routesPath.restaurant,
        ico: menuSVG
      },
      {
        title: 'Crear menú',
        url:
          restaurant.state === true
            ? routesPath.createMenu
            : routesPath.restaurant,
        ico: addSVG
      },
      {
        title: 'Ajustes de menú',
        url:
          restaurant.state === true
            ? routesPath.settingsMenu
            : routesPath.restaurant,
        ico: settingsSVG
      },
      {
        title: 'Restaurante',
        url: routesPath.restaurant,
        ico: shopSVG
      },
      {
        title: 'Cuenta',
        url:
          restaurant.state === true
            ? routesPath.account
            : routesPath.restaurant,
        ico: userSVG
      }
    ],
    []
  )

  return (
    <Sidebar className=''>
      {/* <div
        className={`${
          restaurant.state === true ? 'hidden' : 'block'
        } w-full h-full absolute bg-[#0001] z-50 `}
      ></div> */}
      <SidebarContent>
        <SidebarGroup className='grid grid-rows-[5%_15%_1fr_40%] gap-2 md:grid-rows-[5%_20%_1fr_40%] h-[100%] text-sb_text py-4  '>
          <SidebarHeader>
            <div className='h-full px-5'>
              <img className='h-full' src={logoSVG} alt='' />
            </div>
          </SidebarHeader>
          <SidebarGroupLabel className='flex-complete flex-col  gap-2 h-full  '>
            {/* <Title2 className=''>Mi tienda</Title2> */}
            <div className='h-5/6 '>
              <img
                className='h-full rounded-xl'
                src={restaurant.logo_url ? restaurant.logo_url : shopSVG}
                alt=''
              />
            </div>
            <span className='w-16 h-5 bg-sb_hover font-normal text-sb_text rounded-md flex-complete text-sm gap-1'>
              <img className='h-3/5' src={crownSVG} alt='' />
              PRO
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => setUnEstado(index)}
                    asChild
                    size={'lg'}
                    className={`${
                      unEstado === index && restaurant.state
                        ? 'bg-sb_hover'
                        : ''
                    } focus:bg-red-500 selection:bg-red-50 rounded-none hover:rounded-none  hover:text-sb_text h-full relative  ${
                      !restaurant.state
                        ? index != 3
                          ? 'before:absolute before:block before:top-0 before:left-0 before:w-full before:h-full blur-sm hover:bg-transparent '
                          : 'bg-sb_bg hover:bg-sb_bg'
                        : ''
                    }`}
                  >
                    <div className='h-full select-none '>
                      <picture className=' w-5  flex-complete'>
                        <img src={item.ico} alt='' />
                      </picture>
                      <button
                        onClick={() => navigate(item.url)}
                        className='px-0 text-start cursor-pointer  font-bold text-lg w-full select-none '
                        disabled={restaurant.state ? false : true}
                      >
                        <span>{item.title}</span>
                      </button>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupContent className='flex justify-end h-full flex-col overflow-hidden items-center '>
            <Card className='w-[80%] h-full my-2 bg-border_input_color overflow-hidden'>
              <div className='flex justify-end h-1/3 bg-white p-2'>
                <span className='w-8 h-8 rounded-full bg-sb_bg block '></span>
              </div>
              <div className='p-3 flex h-full flex-col  gap-1 md:gap-3'>
                <Title2 className='text-white text-sm md:text-xl'>
                  ¿Buscando ayuda?
                </Title2>
                <Parr className='text-xs'>
                  Ingresa al panel de soporte y te atenderemos a la brevedad.
                </Parr>
                <Button className='w-full bg-sb_bg h-8 text-sm'>
                  Ingresar a soporte
                </Button>
              </div>
            </Card>
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
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
