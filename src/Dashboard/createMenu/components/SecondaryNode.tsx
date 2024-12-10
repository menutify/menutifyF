import { Button } from '@/components/ui/button'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'

interface secondaryNode {
  id: number
  name: string
  img: string
  state: boolean
  price: number
  index: number
  parentId: number
  dragMode: boolean
}

function SecondaryNode({
  id,
  name,
  img,
  state,
  price,
  index,
  parentId,
  dragMode
}: secondaryNode) {
  // const { setFoods } = useDataGlobalContext()
  const { attributes, listeners, setNodeRef } = useSortable({
    id: 'c-' + parentId + '-' + id,
    disabled: dragMode
  })

  const { categories, setCategories } = useDataGlobalContext()

  const deleteFood = () => {
    console.log('delete')
    setCategories((prev) => {
      const update = [...prev]

      const parentIndex = update.findIndex((e) => e.id === parentId)

      update[parentIndex].foods.splice(index, 1)

      update[parentIndex].foods.forEach((e, i) => (e.pos = i))

      return update
    })
  }

  const changeState = () => {
    console.log('change')
    setCategories((prev) => {
      const update = [...prev]

      const parentIndex = update.findIndex((e) => e.id === parentId)

      update[parentIndex].foods[index].state = !state

      return update
    })
  }

  return (
    <div
      id={'c-' + parentId + '-' + id}
      ref={setNodeRef}
      className={`h-14 flex justify-between items-center p-1 cursor-grab transition-all duration-300 ${
        state ? 'bg-white' : 'bg-[#0002]'
      }`}
      style={{
        margin: '',

        cursor: 'grab',
        position: 'relative',
        border: '1px solid #ccc'
      }}
      {...attributes}
      {...listeners}
    >
      <section className='h-full flex items-center gap-2 select-none'>
        <picture className='h-full'>
          <img className='h-full' src={img} alt='' />
        </picture>
        <div>
          <p>{name}</p>
          <p>${price}</p>
        </div>
      </section>
      <section className={`flex gap-2 items-center `}>
        <div
          className={`transition-all ease-linear duration-300 w-8 h-4 border rounded-lg flex relative before:flex before:absolute before:top-0 before:h-3.5 before:w-3.5 before:bg-gray-400 before:z-10 before:rounded-full before:transition-all before:duration-300 ${
            state
              ? 'before:left-0 bg-green-300'
              : 'before:left-full before:-translate-x-3.5 bg-red-400'
          }`}
          onClick={changeState}
        ></div>
        <button
          onClick={() => console.log('hola')}
          className='select-none bg-blue-100 w-8 h-full flex-complete hover:bg-red-400'
        >
          E
        </button>
        <button
          onClick={deleteFood}
          className='select-none bg-red-100 w-8 h-full flex-complete hover:bg-red-400'
        >
          x
        </button>
      </section>
    </div>
  )
}

export default SecondaryNode
