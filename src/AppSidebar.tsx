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
} from '@/components/ui/sidebar'
import logoVSG from '@/assets/logo.svg'
import menuSVG from '@/assets/sidebar/menu.svg'
import addSVG from '@/assets/sidebar/add.svg'
import settingsSVG from '@/assets/sidebar/settings.svg'
import shopSVG from '@/assets/sidebar/shop1.svg'
import shop2SVG from '@/assets/sidebar/shop2.svg'
import userSVG from '@/assets/sidebar/user.svg'
import logoutSVG from '@/assets/sidebar/logout.svg'
import crownSVG from '@/assets/sidebar/crown.svg'
import { Card } from './components/ui/card'
import Title2 from './components/my/Title2'
import Parr from './components/my/Parr'
import { Button } from './components/ui/button'

export function AppSidebar() {
  const items = [
    {
      title: 'Mis menús',
      url: '#',
      ico: menuSVG
    },
    {
      title: 'Crear menú',
      url: '#',
      ico: addSVG
    },
    {
      title: 'Ajustes de menú',
      url: '#',
      ico: settingsSVG
    },
    {
      title: 'Restaurante',
      url: '#',
      ico: shopSVG
    },
    {
      title: 'Cuenta',
      url: '#',
      ico: userSVG
    }
  ]

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className='grid grid-rows-[5%_15%_1fr_34%] gap-2 md:grid-rows-[5%_20%_1fr_40%] h-[100%] text-sb_text py-4 '>
          <SidebarHeader>
            <div className='h-full px-5'>
              <img className='h-full' src={logoVSG} alt='' />
            </div>
          </SidebarHeader>
          <SidebarGroupLabel className='flex-complete flex-col  gap-2 h-full  '>
            <Title2 className=''>Mi tienda</Title2>
            <div className='h-full  '>
              <img className='h-full rounded-xl' src={shop2SVG} alt='' />
            </div>
            <span className='w-16 h-5 bg-sb_hover font-normal text-sb_text rounded-md flex-complete text-sm gap-1'>
              <img className='h-3/5' src={crownSVG} alt='' />
              PRO
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    size={'lg'}
                    className='hover:rounded-none hover:bg-sb_hover hover:text-sb_text relative '
                  >
                    <div>
                      <picture className='h-full w-5'>
                        <img src={item.ico} alt='' />
                      </picture>
                      <a className='font-bold text-lg' href={item.url}>
                        <span>{item.title}</span>
                      </a>
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
              <div className='p-3 flex flex-col gap-3'>
                <Title2 className='text-white text-2xl'>¿Buscando ayuda?</Title2>
                <Parr className='text-xs'> Ingresa al panel de soporte y te atenderemos a la brevedad.</Parr>
                <Button className='w-full bg-sb_bg h-8 text-sm'>Ingresar a soporte</Button>
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
                <a className='font-bold text-lg' href={'#'}>
                  <span>{'Cerrar Sesión'}</span>
                </a>
              </div>
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
