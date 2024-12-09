import Parr from '@/components/my/Parr'
import Title2 from '@/components/my/Title2'
import Title3 from '@/Components/my/Title3'
import { Button } from '@/components/ui/button'
import { Card } from '@/Components/ui/card'
import { Outlet } from 'react-router-dom'

import { useDataGlobalContext } from '@/Context/GlobalContext'

function CreateMenu() {
  const { foods, categories, setFoods } = useDataGlobalContext()

  const addNewFood = () => {
    setFoods((prev) => [
      ...prev,
      { id: 'g', parentId: 3, name: 'Hijo 7', pos: 1 }
    ])
  }
  return (
    <div className='flex justify-center items-center h-full w-full p-2 gap-2'>
      {/* <div className='fixed z-40 md:z-0 md:absolute bottom-0 left-0 md:top-0 md:right-0 md:justify-end justify-center items-center flex w-full h-20 bg-red-100'>
        <Button
          className={`${
            isPending ? 'bg-white' : 'bg-border_input_color'
          } flex gap-4  px-4 md:pl-8 md:pr-1 md:rounded-lg  rounded-lg h-14`}
          onClick={submitData}
          disabled={isPending}
        >
          Guardar cambios
          <picture className='w-5 h-5 rotate-180'>
            <img src={arrowSVG} alt='' />
          </picture>{' '}
          |{' '}
          <picture className='w-5 h-5'>
            <img src={eyeSVG} alt='' />
          </picture>
        </Button>
      </div> */}
      <Card className='flex-1 flex-complete flex-col h-full w-full bg-gray-200 gap-3'>
        <div className='w-full flex flex-col gap-2'>
          <Title3>Empieza a crear tu nuevo menu</Title3>
          <Parr>Empieza a crear tu menu</Parr>
          <div className='flex gap-3'>
            <div>
              Nueva Categoria<Button>+</Button>
            </div>
            <div>
              Nuevo Plato<Button>+</Button>
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
          <ul className='bg-yellow-100 w-80'>
            {categories.map((todo) => {
              return (
                <li
                  id={`cat-${todo.id}`}
                  className='kanban-item p-2 flex flex-col gap-4 bg-red-300 m-2'
                  key={todo.id}
                >
                  <h2>{todo.id}</h2>

                  <ul>
                    {foods.map((e) => {
                      return (
                        e.parentId == todo.id && (
                          <li key={e.id}>
                            {e.id} --- {e.name} --- {e.pos}
                          </li>
                        )
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
    </div>
  )
}

export default CreateMenu
