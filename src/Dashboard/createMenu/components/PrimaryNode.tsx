import Title2 from '@/Components/my/Title2'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import SecondaryNode from './SecondaryNode'
import { CSS } from '@dnd-kit/utilities'
import { Food } from '@/types'
import upDownSVG from '@/assets/createMenu/updown.svg'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/Components/ui/accordion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/Components/ui/dropdown-menu'
import FormCategorie from './FormCategorie'
import { createPortal } from 'react-dom'
import { useState } from 'react'
import DeleteModal from './DeleteModal'
import { useMenuContext } from '@/Context/GlobalContext'

interface primaryNode {
  id: number
  name: string
  arrayChild: Food[]
  index: number
  isPending: boolean
}

function PrimaryNode({ id, name, arrayChild, index, isPending }: primaryNode) {
  const [visibleCategoryModal, setVisibleCategoryModal] = useState(false)
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false)
  const {
    attributes,
    listeners,
    transform,
    transition,
    setDraggableNodeRef,
    setDroppableNodeRef
  } = useSortable({ id, disabled: isPending })
  const { search } = useMenuContext()

  return (
    <AccordionItem
      value={'item-' + id}
      // ref={setNodeRef}
      ref={setDroppableNodeRef}
      className={`h-full`}
      style={{
        textDecoration: 'none',
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

        border: '1px solid #ccc'
      }}
    >
      <div className='flex items-center justify-between h-auto  bg-yellow-100 px-1 flex-wrap'>
        <AccordionTrigger className='flex justify-start items-center flex-1 h-full hover:no-underline'>
          <Title2 className='select-none no-underline '>{name}</Title2>

          <p className='select-none no-underline'>
            (
            {arrayChild.length == 0
              ? 'vacía'
              : `${arrayChild.length} productos`}
            )
          </p>
        </AccordionTrigger>
        <section className='h-full flex-complete gap-2'>
          <DropdownMenu>
            <DropdownMenuTrigger className='w-10 h-10 outline-none bg-orange-200 select-none'>
              ...
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Opciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setVisibleCategoryModal(true)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setVisibleDeleteModal(true)}>
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <picture
            className='h-6 w-6 flex items-center select-none cursor-grab'
            {...attributes}
            {...listeners}
            ref={setDraggableNodeRef}
          >
            <img className='h-full w-full ' src={upDownSVG} alt='' />
          </picture>
        </section>
      </div>

      {/* Si tiene hijos, renderiza un SortableContext para esos hijos */}
      <AccordionContent className={`${''} w-full`}>
        <SortableContext
          items={arrayChild}
          strategy={verticalListSortingStrategy}
        >
          {search.length == 0
            ? arrayChild.map((food, I) => (
                <SecondaryNode
                  key={'c-' + food.id_cat + '-' + food.id}
                  id={food.id}
                  name={food.foodDetail.name}
                  img={food.foodDetail.img}
                  price={food.foodDetail.price}
                  state={food.state}
                  index={I}
                  parentId={id}
                  star={food.foodDetail.star}
                  isPending={isPending}
                />
              ))
            : arrayChild.map((food) => {
                if (food.foodDetail.name.toLowerCase().startsWith(search.toLowerCase())) {
                  const indexChild = arrayChild.findIndex(
                    (e) => e.id == food.id
                  )
                  return (
                    <SecondaryNode
                      key={'c-' + food.id_cat + '-' + food.id}
                      id={food.id}
                      name={food.foodDetail.name}
                      img={food.foodDetail.img}
                      price={food.foodDetail.price}
                      state={food.state}
                      index={indexChild}
                      parentId={id}
                      star={food.foodDetail.star}
                      isPending={true}
                    />
                  )
                }
              })}
        </SortableContext>
      </AccordionContent>
      {visibleCategoryModal &&
        createPortal(
          <FormCategorie
            action='edit'
            visibilityModal={setVisibleCategoryModal}
            index={index}
          />,
          document.body
        )}
      {visibleDeleteModal &&
        createPortal(
          <DeleteModal
            id={id}
            visibilityModal={setVisibleDeleteModal}
            index={index}
            type='category'
          />,
          document.body
        )}
    </AccordionItem>
  )
}

export default PrimaryNode
