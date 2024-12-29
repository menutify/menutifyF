import Parr from '@/Components/my/Parr'
import Title3 from '@/Components/my/Title3'
import { Card } from '@/Components/ui/card'
import { Outlet } from 'react-router-dom'
import { useDataGlobalContext, useMenuContext } from '@/Context/GlobalContext'
import { useEffect, useState } from 'react'
import ModalFood from '../components/ModalFood'
import { createPortal } from 'react-dom'
import FormCategorie from '../components/FormCategorie'
import { Button } from '@/Components/ui/button'
import MenuPersonalitation from './MenuPersonalitation'
import GetDataShareMenu from '../components/GetDataShareMenu'
// import Test from '../components/test'
declare global {
  interface Window {
    HSCore?: {
      components?: {
        HSComboBox?: {
          initAll: () => void
        }
      }
    }
  }
}

function CreateMenu() {
  const { categories, restaurant } = useDataGlobalContext()
  const { setSearch } = useMenuContext()
  const [visibleFoodModal, setVisibleFoodModal] = useState(false)
  const [visibleCategoryModal, setVisibleCategoryModal] = useState(false)
  const [handleVisualitation, setHandleVisualitation] = useState(false)
  const [visiblePersonalitationModal, setVisiblePersonalitationModal] =
    useState(false)
  const [visibleDataOfMenu, setVisibleDataOfMenu] = useState(false)

  useEffect(() => {
    window.HSCore?.components?.HSComboBox?.initAll()
  }, [])
  // Test()
  return (
    <div className='flex-complete flex-col md:flex-row w-full h-full p-2 gap-2 mt-0'>
      <Card className='flex-1 flex-complete flex-col h-full w-full bg-gray-200 gap-3'>
        <div className='w-full flex flex-col gap-2'>
          <Title3>Empieza a crear tu nuevo menu</Title3>
          <Parr>Empieza a crear tu menu</Parr>
          <div className='flex gap-3 justify-between flex-wrap'>
            <div className='h-10 flex-complete gap-1'>
              <Parr className='text-xl text-[#000]'> Nueva Categoria</Parr>
              <Button
                onClick={() => {
                  if (restaurant.state) {
                    setVisibleCategoryModal(true)
                  } else {
                    alert('Complete los datos del restaurant')
                  }
                }}
              >
                C
              </Button>
            </div>

            <div className='h-10 flex-complete gap-1'>
              <Parr className='text-xl text-[#000]'> Nuevo Plato</Parr>
              <Button
                onClick={() => {
                  if (restaurant.state) {
                    setVisibleFoodModal(true)
                  } else {
                    alert('Complete los datos del restaurant')
                  }
                }}
                disabled={categories.length == 0 && true}
              >
                F
              </Button>
            </div>

            <div className='h-10 flex-complete gap-1'>
              <Parr className='text-xl text-[#000]'> Personalizar</Parr>
              <Button
                onClick={() => {
                  if (restaurant.state) {
                    setVisiblePersonalitationModal(true)
                  } else {
                    alert('Complete los datos del restaurant')
                  }
                }}
                disabled={categories.length == 0 && true}
              >
                lapicito
              </Button>
            </div>
            <div className='h-10 flex-complete gap-1'>
              <Parr className='text-xl text-[#000]'> qr</Parr>
              <Button
                onClick={() => {
                  if (restaurant.state) {
                    setVisibleDataOfMenu(true)
                  } else {
                    alert('Complete los datos del restaurant')
                  }
                }}
                disabled={categories.length == 0 && true}
              >
                qr
              </Button>
            </div>
          </div>
          {/* INPUT SEARCH */}

          <div className='max-w-full '>
            <div className='relative'>
              <div className='relative'>
                <div className='absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5 '>
                  <svg
                    className='shrink-0 size-4 text-gray-400 dark:text-white/60'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <circle cx='11' cy='11' r='8'></circle>
                    <path d='m21 21-4.3-4.3'></path>
                  </svg>
                </div>
                <input
                  className='py-3 ps-10 pe-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
                  type='text'
                  role='combobox'
                  aria-expanded='false'
                  placeholder='Buscar categoría'
                  data-hs-combo-box-input=''
                  onChange={(e) => {
                    e.preventDefault()
                    console.log(e.target.value)
                    setSearch(e.target.value)
                  }}
                />
              </div>
            </div>
          </div>
          {/* ----------------------- */}
        </div>
        <div className='w-full flex-1 bg-yellow-50'>
          <Outlet />
        </div>
      </Card>
      <Card
        className={`${
          handleVisualitation ? 'flex' : 'hidden md:flex'
        } fixed md:relative md:flex-1 top-0 left-0  items-center justify-center w-full h-full bg-opacity-40 bg-green-500 md:bg-gray-200 `}
      >
        <div className='fixed w-[96%] h-[77%] max-h-[700px] flex flex-col max-w-md overflow-y-auto bg-gray-600 rounded-2xl shadow-lg md:max-h-[90%] md:max-w-[270px] lg:max-w-[400px] md:top-1/2 md:-translate-y-1/2 border-8 border-gray-600'>
          {/* Título o botón para cerrar */}

          {/* Contenido principal */}
          <div>
            <ul className='bg-yellow-100 rounded-xl'>
              {categories.map((todo) => {
                return (
                  <li
                    id={`cat-${todo.id}`}
                    className='p-2 flex flex-col gap-4 bg-red-300'
                    key={todo.id + 'flores'}
                  >
                    <h2>
                      id Padre:{todo.id}  -- name:
                      {todo.details.name}
                    </h2>
                    <p>id-----name----index---state</p>
                    <ul>
                      {todo.details.foods.map((e) => (
                        <li key={e.id + 'azucar'}>
                          {e.id} --- {e.foodDetail.name} --- {e.pos} ------
                          {e.state ? '1' : '0'} --- {e.id_cat}
                        </li>
                      ))}
                    </ul>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Card>
      <div className='fixed bottom-0 left-0 w-full h-[74px] bg-red-200 md:hidden flex justify-around items-center'>
        <a
          href=''
          target='_blank'
          className='text-sm border border-[#0005] p-3 rounded-lg bg-yellow-100 w-1/5 flex-complete'
        >
          Link
        </a>
        <button
          onClick={() => setHandleVisualitation(!handleVisualitation)}
          className='text-sm border border-[#0005] p-3 rounded-lg bg-yellow-100 w-2/5 flex-complete'
        >
          {handleVisualitation ? 'Cerrar' : 'Visualizar'}
        </button>
        <button className='text-sm border border-[#0005] p-3 rounded-lg bg-yellow-100 w-1/5 flex-complete'>
          QR
        </button>
      </div>
      {visibleFoodModal &&
        createPortal(
          <ModalFood action='create' visibilityModal={setVisibleFoodModal} />,
          document.body
        )}
      {visibleCategoryModal &&
        createPortal(
          <FormCategorie
            action='create'
            visibilityModal={setVisibleCategoryModal}
            index={-1}
          />,
          document.body
        )}
      {visiblePersonalitationModal &&
        createPortal(
          <MenuPersonalitation closeModal={setVisiblePersonalitationModal} />,
          document.body
        )}
      {visibleDataOfMenu &&
        createPortal(
          <GetDataShareMenu closeModal={setVisibleDataOfMenu} />,
          document.body
        )}
    </div>
  )
}

export default CreateMenu
