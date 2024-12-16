import { Categories } from '@/types'
import { UniqueIdentifier } from '@dnd-kit/core'

//verifica que el item pertenezca al array
export const itemIsinArray = (fatherArray, idElement) => {
  if (fatherArray.findIndex((e) => e.id == idElement) != -1) return true

  return false
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

export const setChildToOtherFamily = (
  prevArray: Array<Categories>,
  activeId: number,
  overId: number | UniqueIdentifier,
  parentActiveId: number,
  parentOverId: number = -1
) => {
  //obtener el indice del padre del food active
  const parentActiveIndex = prevArray.findIndex((e) => e.id === parentActiveId)

  let parentOverIndex
  if (parentOverId != -1) {
    //for child
    parentOverIndex = prevArray.findIndex((e) => e.id === parentOverId)
  } else {
    //for parents
    parentOverIndex = prevArray.findIndex((e) => e.id === overId)
    //verificar si es el mismo padre
    const foodindex = prevArray[parentOverIndex].details.foods.findIndex(
      (e) => e.id === activeId
    )

    if (foodindex != -1) {
      return prevArray
    }
  }

  if (parentActiveIndex === -1 || parentOverIndex === -1) return prevArray

  //obtener posicion del active child
  const childActiveIndex = prevArray[parentActiveIndex].details.foods.findIndex(
    (e) => e.id === activeId
  )

  //for child
  let childOverIndex = -1
  if (parentOverId != -1) {
    //si el componente over es nu hijo, tambien sacamos su indice
    childOverIndex = prevArray[parentOverIndex].details.foods.findIndex(
      (e) => e.id === overId
    )
  }

  // Hacer una copia del array original
  const updatedArray = [...prevArray]

  // Copiar el array entero foods de cada elemento(over y active)
  const activeParentFoods = [...updatedArray[parentActiveIndex].details.foods]

  const overParentsFoods = [...updatedArray[parentOverIndex].details.foods]

  // Extraer el hijo activo
  const [activeData] = activeParentFoods.splice(childActiveIndex, 1)

  // Actualizar las posiciones del antiguo contenedor array de active
  activeParentFoods.forEach((e, i) => (e.pos = i))

  if (childOverIndex !== -1) {
    // Insertar el hijo en la nueva posición dentro del padre over
    overParentsFoods.splice(childOverIndex, 0, {
      ...activeData
    })
  } else {
    // Si es hijo -> padre, agregamosel nuevo objeto al array existente
    overParentsFoods.push({ ...activeData, id_cat: parseInt(overId + '') })
  }

  // Actualizar las posiciones del padre sobre
  overParentsFoods.forEach((e, i) => (e.pos = i))

  // Actualizar los foods de ambos padres en el array principal
  updatedArray[parentActiveIndex] = {
    ...updatedArray[parentActiveIndex],
    details: {
      ...updatedArray[parentActiveIndex].details,
      foods: activeParentFoods
    }
  }

  updatedArray[parentOverIndex] = {
    ...updatedArray[parentOverIndex],
    details: {
      ...updatedArray[parentOverIndex].details,
      foods: overParentsFoods
    }
  }

  return updatedArray
}

export const securityFunction = (id, type, op, letter) => {
  if (op == 0) {
    return typeof id === type || !id.startsWith(letter)
  }

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
    parseInt(aid.split('-')[1]),
    parseInt(oid.split('-')[1])
  ]
}
