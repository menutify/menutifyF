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
import { createPortal } from 'react-dom'
import { useState } from 'react'
import PrimaryNode from './PrimaryNode'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import {
  getMouseTarget,
  
  ItemIsIncludeInArray,
  securityFunction,
  setChangeToArray
} from './utilities'

// Componente principal
const Tree = () => {
  const { categories, setCategories, foods, setFoods } = useDataGlobalContext()

    // const [childVisible, setChildVisible] = useState(true)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0, transform: 0 })

  // Configurar sensores para el arrastre
  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragStart = () => {
    //cambiar posicion de contenedor seleccionado en portal
    setMouseOffset(getMouseTarget())
  }

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    // setChildVisible(true)
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

    const activeIsFather = securityFunction(active.id, 'number', 'c', 0)
    const activeIsChild = securityFunction(active.id, 'string', 'c', 1)
    //verificamos que el padre no quiera meterse el contenedor de los hijos
    if (activeIsFather && !ItemIsIncludeInArray(targetArray, active.id)) {
      console.log('Padre -> hijo')
      return
    }

    //si un hijo se quiere meter el contenedor de los padres
    if (activeIsChild && activeIsFather) {
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
      const activeChildId = active.id.split('-')[1] as string[]
      const overChildId = over.id.split('-')[1]

      //bloquar intercambio de hijos
      if (!ItemIsIncludeInArray(targetArray, activeChildId)) {
        console.log('[Hijo1] -> [Hijo2]')
        return
      }
      //actualizamos el array
      setFoods(setChangeToArray(foods, activeChildId, overChildId))
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
      <div className='flex flex-col gap-3 bg-red-100 p-4'>
        {/* El contexto para los nodos principales (padres) */}
        <SortableContext
          items={categories}
          strategy={verticalListSortingStrategy}
        >
          {categories.map((node) => (
            <PrimaryNode
            key={node.id}
              {...node}
              items={foods}
             
            />
          ))}
        </SortableContext>

        {createPortal(
          <DragOverlay>
            
              <div
                style={{
                  padding: '3px',
                  position: 'absolute',
                  pointerEvents: 'none',
                  left: `${mouseOffset.x}px`,
                  top: `${mouseOffset.y}px`,
                  transform: `translate(-${mouseOffset.transform}%, -${mouseOffset.transform}%)`, // Centra el elemento en el mouse
                  zIndex: 9999
                }}
                className='h-full flex w-full bg-[#aa543244] flex-complete '
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
