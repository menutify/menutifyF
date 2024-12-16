import { createPortal } from 'react-dom'
import PrimaryNode from './PrimaryNode'
import { useDataGlobalContext} from '@/Context/GlobalContext'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  rectIntersection,
  DragEndEvent
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import {
  getNewChildsId,
  ItemIsIncludeInArray,
  securityFunction,
  setChangeToArray,
  setChangeToTreeArray,
  setChildToOtherFamily
} from './utilities'
import { Accordion } from '@/Components/ui/accordion'
import HandleFormSubmit from '@/utils/handleForSubmit'
import { routesApi } from '@/data/routes'

// Componente principal
const Tree = () => {
  const { categories, setCategories, menu } = useDataGlobalContext()
  const { isPending, handlePatchSubmit } = HandleFormSubmit()

  // Configurar sensores para el arrastre
  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragStart = () => {
    //cambiar posicion de contenedor seleccionado en portal
  }

  const handleDragEnd = async ({ active, over }: DragEndEvent) => {
    //si el destino no existe en el contexto
    console.log({ active, over })
    if (!over) {
      console.log('no hay destirno')
      return
    }

    //si el componente destino no existe
    const activeCurrent = over.data.current

    const overCurrent = over.data.current
    if (!overCurrent) {
      console.log('no existe el componente')
      return
    }

    //array target
    const activeItems = activeCurrent.sortable.items
    const overItems = overCurrent.sortable.items

    //si los componentes son iguales no hacer nada
    // console.log(active.id)
    // console.log(active.data.current.sortable.items)
    // console.log(over.id)
    // console.log(overItems)

    if (active.id === over.id) {
      console.log('nada')
      return
    }

    const activeIsFather = securityFunction(active.id, 'number', 0, 'c')
    const activeIsChild = securityFunction(active.id, 'string', 1, 'c')
    const overIsFather = securityFunction(over.id, 'number', 0, 'c')
    //verificamos que el padre no quiera meterse el contenedor de los hijos
    if (activeIsFather && !ItemIsIncludeInArray(overItems, active.id)) {
      console.log('Padre -> hijo')
      return
    }

    //intercambio de padres
    //verificamos que el item seleccionado pertenezca al array padres
    if (activeIsFather && ItemIsIncludeInArray(overItems, active.id)) {
      console.log('Padre -> Padre')
      // api
      const activeIndex = activeItems.indexOf(active.id)
      const overIndex = overItems.indexOf(over.id)

      let direction = 'asc'
      if (activeIndex > overIndex) direction = 'desc'

      const data = await handlePatchSubmit(`${routesApi.dragpp}/${active.id}`, {
        direction,
        activeIndex,
        overIndex,
        idMenu: menu.id
      })

      if (!data) return
      //local
      setCategories(setChangeToArray(categories, active.id, over.id))
    } else {
      const ActiveId = parseInt(active.id.split('-')[2])
      const newParentActiveId = parseInt(active.id.split('-')[1])

      const activeIndex = categories
        .filter((e) => e.id == newParentActiveId)[0]
        .details.foods.findIndex((f) => f.id === ActiveId)

      // si un hijo se quiere meter el contenedor de los padres
      if (activeIsChild && overIsFather) {
        console.log('Hijo -> Padre')

        const lengthFoodsOfNewCat = categories.filter((e) => e.id == over.id)[0]
          .details.foods.length

        const data = await handlePatchSubmit(
          `${routesApi.dragcp}/${ActiveId}`,
          {
            lengthFoodsOfNewCat,
            activeIndex,
            activeCatId: newParentActiveId,
            overCatId: over.id
          }
        )

        if (!data) return

        setCategories((prev) =>
          setChildToOtherFamily(prev, ActiveId, over.id, newParentActiveId)
        )
        return
      }
      //estando aqui solo llega un hijo

      //obtenemos el id de los hijos

      const [activeChildId, overChildId, parentActiveId, parentOverId] =
        getNewChildsId(active.id, over.id)

      const overIndex = categories
        .filter((e) => e.id == parentOverId)[0]
        .details.foods.findIndex((f) => f.id === overChildId)

      //bloquar intercambio de hijos
      if (!ItemIsIncludeInArray(overItems, activeChildId)) {
        console.log('[Hijo1] -> [Hijo2]')
        //bd
        const data = await handlePatchSubmit(
          `${routesApi.dragccg}/${ActiveId}`,
          {
            activeIndex,
            overIndex,
            activeCatId: parentActiveId,
            overCatId: parentOverId
          }
        )

        if (!data) return

        //local
        setCategories((prev) => {
          console.log('entramos')
          return setChildToOtherFamily(
            prev,
            activeChildId,
            overChildId,
            parentActiveId,
            parentOverId
          )
        })
        return
      }
      //actualizamos el array

      console.log('Hijo1 -> Hijo2')

      //db

      let direction = 'asc'
      if (activeIndex > overIndex) direction = 'desc'

      const data = await handlePatchSubmit(
        `${routesApi.dragcc}/${ActiveId}?direction=${direction}`,
        {
          activeIndex,
          overIndex,
          activeCatId: newParentActiveId
        }
      )

      if (!data) return

      //local
      setCategories((prev) => {
        const updateData = [...prev]

        const parentIndex = categories.findIndex(
          (e) => e.id == parentActiveId,
          parentOverId
        )

        updateData[parentIndex].details.foods = setChangeToTreeArray(
          updateData[parentIndex].details.foods,
          activeChildId,
          overChildId
        )
        return updateData
      })
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}

      // onDragMove={(e) => console.log({ e })}
    >
      <Accordion type='multiple' className='flex flex-col gap-3 bg-red-200 p-4'>
        {/* El contexto para los nodos principales (padres) */}
        <SortableContext
          items={categories}
          strategy={verticalListSortingStrategy}
        >
          
            {categories.map((categorie, i) => {
              return (
                <PrimaryNode
                  key={categorie.id}
                  id={categorie.id}
                  name={categorie.details.name}
                  arrayChild={categorie.details.foods}
                  index={i}
                  isPending={isPending}
                />
              )
            })}
          
  
        </SortableContext>

        {createPortal(
          <DragOverlay dropAnimation={null}>
            <div
              style={{
                padding: '3px',
                position: 'absolute',
                // pointerEvents: 'none',
                left: `${0}px`,
                top: `${0}px`,

                zIndex: 9999
              }}
              className='h-full flex w-full bg-[#aa543244] flex-complete cursor-grabbing focus:cursor-grabbing  '
            >
              MOVE
            </div>
          </DragOverlay>,
          document.body
        )}
      </Accordion>
    </DndContext>
  )
}

export default function App() {
  return <Tree />
}
