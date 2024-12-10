import Title2 from '@/components/my/Title2'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import SecondaryNode from './SecondaryNode'
import { CSS } from '@dnd-kit/utilities'
import { FoodOrderList } from '@/types'
import { ArrowDown } from 'lucide-react'

interface primaryNode {
  id: number
  name: string
  arrayChild: FoodOrderList[]
  dragMode: boolean
}

function PrimaryNode({ id, name, arrayChild, dragMode }: primaryNode) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, disabled: dragMode })

  return (
    <div
      ref={setNodeRef}
      className={`h-full `}
      style={{
        transform: CSS.Transform.toString({
          scaleX: transform?.scaleX || 1,
          scaleY: 1,
          x: transform?.x || 0,
          y: transform?.y || 0
        }),
        transition: transition,
        // paddingLeft: `${20}px`, // Indenta según la profundidad
        margin: '',
        background: '#f9f9f9',
        cursor: 'grab',
        position: 'relative',
        border: '1px solid #ccc'
      }}
      {...attributes}
      {...listeners}
    >
      <div className='flex items-center justify-between '>
        <section className='flex justify-start items-center bg-yellow-50 flex-1'>
          <div>
            <ArrowDown />
          </div>
          <Title2 className='select-none'>{name}</Title2>
          <div className='select-none'>
            (
            {arrayChild.length == 0
              ? 'Categoría vacía'
              : `${arrayChild.length} productos`}
            )
          </div>
        </section>
        <section>
          <button
            onClick={() => console.log('hola')}
            className='select-none bg-green-100 w-10 h-full flex-complete hover:bg-red-400'
          >
            ...
          </button>
        </section>
      </div>

      {/* Si tiene hijos, renderiza un SortableContext para esos hijos */}
      <div className={`${''} w-full`}>
        <SortableContext
          items={arrayChild}
          strategy={verticalListSortingStrategy}
        >
          {arrayChild.map((food, index) => (
            <SecondaryNode
              key={'c-' +food.id_cat+'-' +food.id}
              id={food.id}
              name={food.name}
              img={food.img}
              state={food.state}
              price={food.price}
              index={index}
              parentId={id}
              dragMode={dragMode}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}

export default PrimaryNode
