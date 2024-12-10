import { Categories } from '@/types'

//verifica que el item pertenezca al array
export const itemIsinArray = (fatherArray, idElement) => {
  if (fatherArray.findIndex((e) => e.id == idElement) != -1) return true

  return false
}

// Captura la posición del puntero en relación con el elemento arrastrado
export const getMouseTarget = () => {
  const rect = event.target.getBoundingClientRect()

  if (!rect) {
    return { x: 0, y: 0, transform: 0 }
  }

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
    transform: 50
  }
}

export const setChangeToArray = (prevArray, activeId, overId) => {
  const updatedItems = [...prevArray]

  //index del objeto viejo
  const oldIndex = updatedItems.findIndex((item) => item.id === activeId)
  const [movedNode] = updatedItems.splice(oldIndex, 1)

  const newIndex = prevArray.findIndex((item) => item.id === overId)

  updatedItems.splice(newIndex, 0, movedNode)

  updatedItems.forEach((e, i) => (e.pos = i))

  return updatedItems
}

export const setChangeToTreeArray = (prevArray, activeId, overId) => {
  //index del objeto viejo
  const oldIndex = prevArray.findIndex((item) => item.id === activeId)

  const newIndex = prevArray.findIndex((item) => {
    return item.id === overId
  })

  const [movedNode] = prevArray.splice(oldIndex, 1)

  prevArray.splice(newIndex, 0, movedNode)

  prevArray.forEach((e, i) => (e.pos = i))

  return prevArray
}

export const securityFunction = (id, type, op, letter) => {
  if (op == 0) {
    console.log('o')
    return typeof id === type || !id.startsWith(letter)
  }
  console.log('i')
  return typeof id === type && id.startsWith(letter)
}

export const ItemIsIncludeInArray = (arrayData, id) => {
  return arrayData.includes(id)
}

/**
 *
 * @param aid activeID
 * @param oid overID
 * @returns :
 * - [NEWactiveId ,NEWoverID ,ParentID]
 */
export const getNewChildsId = (aid, oid) => {
  return [
    parseInt(aid.split('-')[2]),
    parseInt(oid.split('-')[2]),
    parseInt(aid.split('-')[1])
  ]
}
