import Title2 from '@/components/my/Title2'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import SecondaryNode from './SecondaryNode'

function PrimaryNode({ id, name, depth, children, items }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  return (
    <div
      ref={setNodeRef}
      className={`h-full `}
      style={{
        // transform: CSS.Transform.toString(transform),
        // transition: transition,
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
      <Title2 className='select-none'>{name}</Title2>

      {/* Si tiene hijos, renderiza un SortableContext para esos hijos */}
      <div
        className={`${''} w-full`}
      >
        <SortableContext
          items={items.filter((e) => e.parentId == id)}
          strategy={verticalListSortingStrategy}
        >
          {items
            .filter((e) => e.parentId == id)
            .map((child, index) => (
              <SecondaryNode
                key={'c-' + child.id}
                id={child.id}
                name={child.name}
                depth={child.depth}
                index={index}
                parentId={id}
              />
            ))}
        </SortableContext>
      </div>
    </div>
  )
}

export default PrimaryNode
