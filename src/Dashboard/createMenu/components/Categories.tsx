import { createPortal } from 'react-dom'
import { useState } from 'react'
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
  getMouseTarget,
  getNewChildsId,
  ItemIsIncludeInArray,
  securityFunction,
  setChangeToArray,
  setChangeToTreeArray
} from './utilities'
import { Button } from '@/components/ui/button'

// Componente principal
const Tree = () => {
  const { categories, setCategories } = useDataGlobalContext()

  const [dragMode, setDragMode] = useState(true)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0, transform: 0 })

  // Configurar sensores para el arrastre
  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragStart = () => {
    //cambiar posicion de contenedor seleccionado en portal
    setMouseOffset(getMouseTarget())
  }

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    //si el destino no existe en el contexto
    if (!over) {
      return
    }

    //si el componente destino no existe
    const targetComponent = over.data.current
    if (!targetComponent) return

    //array target
    const targetArray = targetComponent.sortable.items

    //si los componentes son iguales no hacer nada
    if (active.id === over.id) {
      return
    }

    const activeIsFather = securityFunction(active.id, 'number', 0,'c')
    const activeIsChild = securityFunction(active.id, 'string', 1,'c')
    const overIsFather = securityFunction(over.id, 'number', 0,'c')
    //verificamos que el padre no quiera meterse el contenedor de los hijos
    if (activeIsFather && !ItemIsIncludeInArray(targetArray, active.id)) {
      console.log('Padre -> hijo')
      return
    }

    //si un hijo se quiere meter el contenedor de los padres
    if (activeIsChild && overIsFather) {
      console.log('Hijo -> Padre')
      return
    }

    //intercambio de padres
    //verificamos que el item seleccionado pertenezca al array padres
    if (activeIsFather && ItemIsIncludeInArray(targetArray, active.id)) {
      console.log('Padre -> Padre')
      setCategories(setChangeToArray(categories, active.id, over.id))
    } else {
      //estando aqui solo llega un hijo

      //obtenemos el id de los hijos
      console.log({ active, over })
      const [activeChildId, overChildId, parentId] = getNewChildsId(
        active.id,
        over.id
      )

      //bloquar intercambio de hijos
      if (!ItemIsIncludeInArray(targetArray, activeChildId)) {
        console.log('[Hijo1] -> [Hijo2]')
        return
      }
      //actualizamos el array

      setCategories((prev) => {
        const updateData = [...prev]

        const parentIndex = categories.findIndex((e) => e.id == parentId)

        updateData[parentIndex].foods = setChangeToTreeArray(
          updateData[parentIndex].foods,
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
      <div className='flex flex-col gap-3 bg-red-200 p-4'>
        <Button onClick={() => setDragMode(!dragMode)}>
          {dragMode ? 'Editar orden' : 'Guardar'}
        </Button>
        {/* El contexto para los nodos principales (padres) */}
        <SortableContext
          items={categories}
          strategy={verticalListSortingStrategy}
        >
          {categories.map((categorie) => (
            <PrimaryNode
              key={categorie.id}
              id={categorie.id}
              name={categorie.name}
              arrayChild={categorie.foods}
              dragMode={dragMode}
            />
          ))}
        </SortableContext>

        {createPortal(
          <DragOverlay>
            <div
              style={{
                padding: '3px',
                position: 'absolute',
                // pointerEvents: 'none',
                left: `${mouseOffset.x}px`,
                top: `${mouseOffset.y}px`,
                transform: `translate(-${mouseOffset.transform}%, -${mouseOffset.transform}%)`, // Centra el elemento en el mouse
                zIndex: 9999
              }}
              className='h-full flex w-full bg-[#aa543244] flex-complete cursor-grabbing focus:cursor-grabbing  '
            >
              MOVE
            </div>
          </DragOverlay>,
          document.body
        )}
      </div>
    </DndContext>
  )
}

export default function App() {
  return <Tree />
}
