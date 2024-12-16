import { useDataGlobalContext } from '@/Context/GlobalContext'
import { useSortable } from '@dnd-kit/sortable'
import upDownSVG from '@/assets/createMenu/updown.svg'
import starSVG from '@/assets/createMenu/star.svg'
import { CSS } from '@dnd-kit/utilities'
import { createPortal } from 'react-dom'
import ModalFood from './ModalFood'
import { useState } from 'react'
import DeleteModal from './DeleteModal'
import foodSVG from '@/assets/createMenu/food.svg'
import HandleFormSubmit from '@/utils/handleForSubmit'
import { routesApi } from '@/data/routes'
interface secondaryNode {
  id: number
  name: string
  img: string
  state: boolean
  price: number
  index: number
  parentId: number
  star: boolean | string
  isPending: boolean
}

function SecondaryNode({
  id,
  name,
  img,
  state,
  price,
  index,
  parentId,
  star,
  isPending
}: secondaryNode) {
  // const { setFoods } = useDataGlobalContext()
  const { handlePatchSubmit, isPending: isPendingSubmit } = HandleFormSubmit()
  const {
    attributes,
    listeners,
    setDroppableNodeRef,
    setDraggableNodeRef,
    transform,
    transition
  } = useSortable({
    id: 'c-' + parentId + '-' + id,
    disabled: isPending || isPendingSubmit
  })

  const { setCategories } = useDataGlobalContext()
  const [visibleModal, setVisibleModal] = useState(false)
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false)
  const changeState = async () => {
    console.log('change')
    const data = await handlePatchSubmit(`${routesApi.state}/${id}`, {
      state: !state
    })

    if (!data) return

    setCategories((prev) => {
      const update = [...prev]
      const parentIndex = update.findIndex((e) => e.id === parentId)

      update[parentIndex].details.foods[index].state = !state

      return update
    })
  }

  return (
    <div
      id={'c-' + parentId + '-' + id}
      ref={setDroppableNodeRef}
      className={`h-14 flex justify-between items-center p-1 ${
        state ? 'bg-white' : 'bg-[#0002]'
      }`}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
        margin: '',

        position: 'relative',
        border: '1px solid #ccc'
      }}
    >
      <section className='h-full flex items-center gap-2 select-none'>
        <picture className='h-full w-10 overflow-hidden'>
          <img
            className='h-full w-full object-cover'
            src={img === '' ? foodSVG : img}
            alt=''
          />
        </picture>
        <div>
          <p>{name}</p>
          <p>${price}</p>
        </div>
        <picture className='w-5 h-5 flex-complete'>
          {star ? <img src={starSVG} alt='' /> : <></>}
        </picture>
      </section>
      <section className={`flex gap-2 items-center h-full `}>
        <>
          <button
            className={`transition-all ease-linear duration-300 w-8 h-4 border rounded-lg flex relative before:flex before:absolute before:top-0 before:h-3.5 before:w-3.5 before:bg-gray-400 before:z-10 before:rounded-full before:transition-all before:duration-300 ${
              state
                ? 'before:left-0 bg-green-300'
                : 'before:left-full before:-translate-x-3.5 bg-red-400'
            }`}
            onClick={changeState}
            disabled={isPendingSubmit && true}
          ></button>
          <button
            disabled={isPendingSubmit && true}
            onClick={() => setVisibleModal(true)}
            className='select-none bg-red-100 w-8 h-full flex-complete hover:bg-red-400'
          >
            E
          </button>
          <button
            disabled={isPendingSubmit && true}
            onClick={() => setVisibleDeleteModal(true)}
            className='select-none bg-red-100 w-8 h-full flex-complete hover:bg-red-400'
          >
            x
          </button>
          <picture
            ref={setDraggableNodeRef}
            {...attributes}
            {...listeners}
            className='h-full flex items-center select-none cursor-grab'
          >
            <img className='h-2/4' src={upDownSVG} alt='' />
          </picture>
        </>
      </section>
      {visibleModal &&
        createPortal(
          <ModalFood
            action='edit'
            visibilityModal={setVisibleModal}
            childId={id}
            parentId={parentId}
            indexChild={index}
          />,
          document.body
        )}
      {visibleDeleteModal &&
        createPortal(
          <DeleteModal
            id={id}
            visibilityModal={setVisibleDeleteModal}
            index={index}
            type='food'
            parentId={parentId}
          />,
          document.body
        )}
    </div>
  )
}

export default SecondaryNode
