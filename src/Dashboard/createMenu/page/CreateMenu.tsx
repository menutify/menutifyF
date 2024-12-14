import Parr from '@/Components/my/Parr'
import Title3 from '@/Components/my/Title3'
import { Button } from '@/components/ui/button'
import { Card } from '@/Components/ui/card'
import { Outlet } from 'react-router-dom'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import { useState } from 'react'
import ModalFood from '../components/ModalFood'
import { createPortal } from 'react-dom'
import FormCategorie from '../components/FormCategorie'
// import Test from '../components/test'

function CreateMenu() {
  const { categories, setFoods } = useDataGlobalContext()
  const [visibleFoodModal, setVisibleFoodModal] = useState(false)
  const [visibleCategoryModal, setVisibleCategoryModal] = useState(false)

  // Test()

  const addNewFood = () => {
    setFoods((prev) => [
      ...prev,
      { id: 'g', parentId: 3, name: 'Hijo 7', pos: 1 }
    ])
  }
  return (
    <div className='flex justify-center items-center h-full w-full p-2 gap-2'>
      <Card className='flex-1 flex-complete flex-col h-full w-full bg-gray-200 gap-3'>
        <div className='w-full flex flex-col gap-2'>
          <Title3>Empieza a crear tu nuevo menu</Title3>
          <Parr>Empieza a crear tu menu</Parr>
          <div className='flex gap-3 justify-between flex-wrap'>
            <div className='h-10 flex-complete gap-1'>
              <Parr className='text-xl text-[#000]'> Nueva Categoria</Parr>
              <button onClick={() => setVisibleCategoryModal(true)}>+</button>
            </div>

            <div className='h-10 flex-complete gap-1'>
              <Parr className='text-xl text-[#000]'> Nuevo Plato</Parr>
              <button onClick={() => setVisibleFoodModal(true)}>+</button>
            </div>
          </div>
          <input
            type='text'
            className='bg-white h-10 w-full  border border-gray-500'
          />
        </div>
        <div className='w-full flex-1 bg-yellow-50'>
          <Outlet />
        </div>
      </Card>
      <Card className='flex-1 flex-complete flex-col h-full w-full bg-gray-600'>
        <div className='kanban-board'>
          <strong>Rank your favorite flavors</strong>
          <br />

          <br />
          <ul className='bg-yellow-100 w-[400px]'>
            {categories.map((todo) => {
              return (
                <li
                  id={`cat-${todo.id}`}
                  className='kanban-item p-2 flex flex-col gap-4 bg-red-300 m-2'
                  key={todo.id + 'flores'}
                >
                  <h2>
                    id Padre:{todo.id} -- index:{todo.pos}
                  </h2>
                  <p>id-----name----index---state</p>
                  <ul>
                    {todo.details.foods.map((e) => {
                      return (
                        <li key={e.id + 'azucar'}>
                          {e.id} --- {e.foodDetail.name} --- {e.pos} ------
                          {e.state ? '1' : '0'} --- {e.id_cat}
                        </li>
                      )
                    })}
                  </ul>
                </li>
              )
            })}
            <Button className='w-full' onClick={addNewFood}>
              addCate
            </Button>
            <Button className='w-full' onClick={addNewFood}>
              addFood
            </Button>
          </ul>
        </div>
      </Card>
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
    </div>
  )
}

export default CreateMenu
