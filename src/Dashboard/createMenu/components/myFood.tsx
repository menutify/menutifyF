import { Button } from '@/components/ui/button'
import { Card } from '@/Components/ui/card'
import { useDataGlobalContext } from '@/Context/GlobalContext'
import { useDragAndDrop } from '@formkit/drag-and-drop/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Foods({ id, menus }) {

  const navigate = useNavigate()
  const { setMenus } = useDataGlobalContext()
  const [indexOfDragFatherStart, setIndexOfDragFatherStart] = useState(0)
  const [idOfDragChildStart, setIdOfDragChildStart] = useState('0')
  const indexOfArray = menus.findIndex((data) => data.id === id)
  const [deleteModal, setDeleteModal] = useState([])

  const [childList, childItems] = useDragAndDrop<HTMLUListElement, string>(
    menus[indexOfArray].foods,
    {
      group: `childList-${menus[indexOfArray].foods.id}`,
      onDragstart: (event) => {
        console.log('dragstart')
        setIndexOfDragFatherStart(parseInt(event.parent.el.id))
        setIdOfDragChildStart(event.draggedNode.el.id)
      },
      onDragend: (event) => {
        console.log('dragend')
        console.log({ id: event.parent.el.id, end: event })
        const indexOfDragend = parseInt(event.parent.el.id)

        setMenus((prevChildState) => {
          if (indexOfDragFatherStart == indexOfDragend) {
            const update = [...prevChildState]
            update[indexOfArray].foods = event.values
            return update
          }

          const update2 = [...prevChildState]
          // console.log({ update2 })
          update2[indexOfArray].foods = update2[indexOfArray].foods.filter(
            (e) => {
              // console.log({ eid: e.id, fid: idOfDragChildStart })
              return e.id != idOfDragChildStart
            }
          )
          update2[indexOfDragend].foods = event.values
          // console.log({ update2 })

          return update2
        })
      },
      onSort: (e) => {
        console.log({ sort: e })
      },
      dropZoneClass: 'bg-red-600',
      // dropZone: false, //permite transferir de zonas
      onTransfer: (e) => {
        console.log('transfer')
        console.log(e)
      }
    }
  )

  return (
    <>
      {deleteModal.length != 0 ? (
        <Card className='flex absolute w-full h-full bg-[#000a] top-0 left-0'>
          {' '}
          (
          <Button
            onClick={(e) => {
              console.log(deleteModal)
              setMenus((prev) => {
                const update = [...prev]
                update[deleteModal[0]].foods =
                  update[deleteModal[0]].foods.filter(
                    (e) => e.id != deleteModal[1]
                  ) || []
                return update
              })
              navigate('/dashboard/create')
            }}
          >
            o
          </Button>
          )
        </Card>
      ) : (
        <></>
      )}
      <ul
        key={id}
        id={indexOfArray}
        ref={childList}
        className='bg-border_input_color p-4 flex flex-col gap-3'
      >
        {/* <Button>+</Button> */}
        {childItems.map((food) => (
          <li
            id={food.id + ''}
            key={food.id}
            className='bg-yellow-100 w-full h-10 flex justify-between items-center p-1'
            draggable='true'
          >
            <p>{food.id}</p>
            {/* le doy el index del contenedor y el id de la comida */}
            <Button
              id={`${indexOfArray}-${food.id}`}
              className=' h-full'
              onClick={(e) => setDeleteModal(e.target.id.split('-'))}
            >
              O
            </Button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Foods
