import { Button } from '@/components/ui/button'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import { useSortable } from '@dnd-kit/sortable'

function SecondaryNode({ id, name, depth, index, parentId }) {
  const { setFoods } = useDataGlobalContext()
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: 'c-' + id })

  const deleteFood = () => {
    setFoods((prev) => {
      return [...prev.filter((e) => e.parentId == parentId)].slice(index, 1)
    })
  }

  return (
    <div
      id={'c-' + id}
      ref={setNodeRef}
      className='h-10 flex justify-between items-center p-1'
      style={{
        paddingLeft: `${depth * 20}px`, // Indenta según la profundidad
        margin: '',
        background: '#f9f9f9',
        cursor: 'grab',
        position: 'relative',
        border: '1px solid #ccc'
      }}
      {...attributes}
      {...listeners}
    >
      <p>{name}</p>
      <Button className='h-full' onClick={deleteFood}>
        X
      </Button>
    </div>
  )
}

export default SecondaryNode
