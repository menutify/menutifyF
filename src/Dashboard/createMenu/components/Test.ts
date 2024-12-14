function Test() {
  const firstArrayTest = [
    {
      id: 1,
      id_menu: 3,
      pos: 0,
      categoriesDetail: {
        name: 'hamburguesas',
        desc: 'hamburguesas ricas'
      },
      food: [
        {
          id: 10,
          id_cat: 1,
          state: true,
          pos: 3,
          foodDetail: {
            id: 4,
            id_food: 10,
            img: 'https://menutifytest.s3.sa-east-1.amazonaws.com/menutifyfolder/4/3/foods/food_10.webp',
            price: 1000,
            name: 'Hanburguesa americana',
            star: false,
            desc: 'Una rica hamburguresa'
          }
        },
        {
          id: 9,
          id_cat: 1,
          state: true,
          pos: 2,
          foodDetail: {
            id: 3,
            id_food: 9,
            img: 'https://menutifytest.s3.sa-east-1.amazonaws.com/menutifyfolder/4/3/foods/food_9.webp',
            price: 1000,
            name: 'Hanburguesa americana',
            star: false,
            desc: 'Una rica hamburguresa'
          }
        },
        {
          id: 8,
          id_cat: 1,
          state: true,
          pos: 1,
          foodDetail: {
            id: 2,
            id_food: 8,
            img: 'https://menutifytest.s3.sa-east-1.amazonaws.com/menutifyfolder/4/3/foods/food_8.webp',
            price: 1000,
            name: 'Hanburguesa americana',
            star: false,
            desc: 'Una rica hamburguresa'
          }
        },
        {
          id: 7,
          id_cat: 1,
          state: true,
          pos: 0,
          foodDetail: {
            id: 1,
            id_food: 7,
            img: 'https://menutifytest.s3.sa-east-1.amazonaws.com/menutifyfolder/4/3/foods/food_7.webp',
            price: 1000,
            name: 'Hanburguesa americana',
            star: false,
            desc: 'Una rica hamburguresa'
          }
        }
      ]
    },
    {
      id: 2,
      id_menu: 3,
      pos: 1,
      categoriesDetail: {
        name: 'Entradas',
        desc: 'Entradas ricas'
      },
      food: [
        {
          id: 11,
          id_cat: 2,
          state: true,
          pos: 0,
          foodDetail: {
            id: 5,
            id_food: 11,
            img: 'https://menutifytest.s3.sa-east-1.amazonaws.com/menutifyfolder/4/3/foods/food_11.webp',
            price: 1500.2,
            name: 'Hanburguesa americana',
            star: false,
            desc: 'Una rica hamburguresa'
          }
        }
      ]
    },
    {
      id: 4,
      id_menu: 3,
      pos: 2,
      categoriesDetail: {
        name: 'Postres',
        desc: 'Postres ricas'
      },
      food: []
    }
  ]

  const changeArray = firstArrayTest.map((value) => {
    const { food, categoriesDetail, ...alldata } = value
    return { ...alldata, categoriesDetail: { ...categoriesDetail, food } }
  })

  console.log({ changeArray })

  const testArray = [
    {
      id: 1,
      pos: 0,
      id_menu: 1,
      details: {
        name: 'Padre 1',
        foods: [
          {
            id: 0,
            id_cat: 1,
            state: true,
            pos: 0,
            details: {
              img: 'foodSVG',
              price: 123,
              name: 'AAAAAA',
              star: false,
              desc: '',
              id: 0,
              id_food: 0
            }
          },
          {
            id: 1,
            id_cat: 1,
            state: true,
            pos: 1,
            details: {
              img: 'foodSVG',
              price: 123,
              name: 'ASDSFDS',
              star: false,
              desc: '',
              id: 1,
              id_food: 1
            }
          },
          {
            id: 2,
            id_cat: 1,
            pos: 2,
            state: true,
            details: {
              img: 'foodSVG',
              price: 123,
              name: 'BFSD',
              star: false,
              desc: '',
              id: 2,
              id_food: 2
            }
          }
        ]
      }
    },
    {
      id: 2,
      pos: 1,
      id_menu: 1,
      details: {
        name: 'Padre 2',
        foods: [
          {
            id: 3,
            id_cat: 2,
            pos: 0,
            state: true,
            details: {
              img: 'foodSVG',
              price: 123,
              name: 'CCSADSAD',
              star: false,
              desc: '',
              id: 3,
              id_food: 3
            }
          },
          {
            id: 4,
            id_cat: 2,
            pos: 1,
            state: true,
            details: {
              img: 'foodSVG',
              price: 123,
              name: 'ACSC',
              star: false,
              desc: '',
              id: 4,
              id_food: 4
            }
          }
        ]
      }
    },
    {
      id: 3,
      pos: 2,
      id_menu: 1,
      details: {
        name: 'Padre 3',
        foods: [
          {
            id: 5,
            id_cat: 3,
            pos: 0,
            state: true,
            details: {
              img: 'foodSVG',
              price: 123,
              name: 'CSDSDS',
              star: false,
              desc: '',
              id: 5,
              id_food: 5
            }
          }
        ]
      }
    },
    {
      id: 4,
      pos: 3,
      id_menu: 1,
      details: { name: 'Padre 4', foods: [] }
    }
  ]
  type FoodObject = {
    name: string
    parentId: number
    id: number
  }

  const obtainObjectWithPrimaryKey = testArray.reduce((acc, valor) => {
    acc = {
      ...acc,
      ...valor.details.foods.reduce(
        (fooacc: Record<string, FoodObject[]>, food) => {
          const firstLetter = food.details.name[0].toLowerCase()
          const newObject: FoodObject = {
            name: food.details.name,
            parentId: food.id_cat,
            id: food.details.id
          }

          // Si la clave ya existe, añade el nuevo objeto al array, si no, inicializa el array
          fooacc[firstLetter] = fooacc[firstLetter]
            ? [...fooacc[firstLetter], newObject]
            : [newObject]

          return fooacc
        },
        acc
      ) // Usamos el acumulador existente
    }
    return acc
  }, {})

  // console.log(obtainObjectWithPrimaryKey)

  //todo:
  /*
 -crear un segundo objeto con las letras de keys al momento de cargar el dashboard
 - if(la cantidad de los foods cambia) hacer de nuevo lo de arriba
 - implementar la logica del input con un onchange, al poner la primera
 - probarlo con un clg
 -ver la manera de filtrar los objetos draggables
 - display none
  
 */

  //contar los food antes de ejecutar el obtaienObject....
  const countTreeArrayChilds = testArray.reduce((acc, value) => {
    return acc + value.details.foods.length
  }, 0)

  // console.log(countTreeArrayChilds)

  const lineItems = [
    { description: 'Eggs (Dozen)', quantity: 1, price: 3, total: 3 },
    { description: 'Exxxx (Dozen)', quantity: 1, price: 3, total: 3 },
    { description: 'Cheese', quantity: 0.5, price: 5, total: 2.5 },
    { description: 'Cdsdsde', quantity: 0.5, price: 5, total: 2.5 },
    { description: 'Butter', quantity: 2, price: 6, total: 12 }
  ]

  const obtainObjectWithPrimaryKeySimple = lineItems.reduce((acc, value) => {
    const firstLetter = value.description[0].toLowerCase()

    acc[firstLetter] = acc[firstLetter] ? [...acc[firstLetter], value] : [value]

    return { ...acc }
  }, {})

  // console.log(obtainObjectWithPrimaryKeySimple)
}

export default Test
