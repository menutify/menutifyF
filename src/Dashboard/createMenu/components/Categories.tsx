import { createPortal } from 'react-dom'
import PrimaryNode from './PrimaryNode'
import { useDataGlobalContext } from '@/Context/GlobalContext'
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

// Componente principal
const Tree = () => {
  const { categories, setCategories } = useDataGlobalContext()

  // Configurar sensores para el arrastre
  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragStart = () => {
    //cambiar posicion de contenedor seleccionado en portal
  }

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    //si el destino no existe en el contexto
    console.log({ active, over })
    if (!over) {
      console.log('no hay destirno')
      return
    }

    //si el componente destino no existe
    const targetComponent = over.data.current
    if (!targetComponent) {
      console.log('no existe el componente')
      return
    }

    //array target
    const targetArray = targetComponent.sortable.items

    //si los componentes son iguales no hacer nada
    // console.log(active.id)
    // console.log(active.data.current.sortable.items)
    // console.log(over.id)
    // console.log(targetArray)

    if (active.id === over.id) {
      console.log('nada')
      return
    }

    const activeIsFather = securityFunction(active.id, 'number', 0, 'c')
    const activeIsChild = securityFunction(active.id, 'string', 1, 'c')
    const overIsFather = securityFunction(over.id, 'number', 0, 'c')
    //verificamos que el padre no quiera meterse el contenedor de los hijos
    if (activeIsFather && !ItemIsIncludeInArray(targetArray, active.id)) {
      console.log('Padre -> hijo')
      return
    }

    //intercambio de padres
    //verificamos que el item seleccionado pertenezca al array padres
    if (activeIsFather && ItemIsIncludeInArray(targetArray, active.id)) {
      console.log('Padre -> Padre')
      setCategories(setChangeToArray(categories, active.id, over.id))
    } else {
      const ActiveId = parseInt(active.id.split('-')[2])
      const newParentActiveId = parseInt(active.id.split('-')[1])
      // si un hijo se quiere meter el contenedor de los padres
      if (activeIsChild && overIsFather) {
        console.log('Hijo -> Padre')

        setCategories((prev) =>
          setChildToOtherFamily(prev, ActiveId, over.id, newParentActiveId)
        )
        return
      }
      //estando aqui solo llega un hijo

      //obtenemos el id de los hijos

      const [activeChildId, overChildId, parentActiveId, parentOverId] =
        getNewChildsId(active.id, over.id)

      //bloquar intercambio de hijos
      if (!ItemIsIncludeInArray(targetArray, activeChildId)) {
        console.log('[Hijo1] -> [Hijo2]')
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
