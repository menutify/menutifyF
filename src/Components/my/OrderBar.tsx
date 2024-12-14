import { useEffect, useState, useMemo } from 'react'

function OrderBar({
  state = 0,
  indexLen = 2,
  func
}: {
  state: number
  indexLen: number
  func: (index: number) => void
}) {
  const [options, setOptions] = useState<number[][]>([])

  const arrayOption = useMemo(() => {
    //from: crea un arreglo y que ira dentro de ese arreglo
    const data = Array.from({ length: 3 }, () => Array(3).fill(0))

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i === j) {
          data[i][j] = 1
        } else {
          data[i][j] = 0
        }
      }
    }
    // console.log(data)
    return data
  }, [])

  useEffect(() => {
    setOptions(arrayOption)
  }, [indexLen])

  const isValidState = options[state] !== undefined

  return (
    <div className='h-4 w-full  justify-center items-center relative flex  gap-6 '>
      {options.map((e, i) => (
        <span
          key={`elkake${i}`}
          onClick={() => func(i)}
          className={`h-full cursor-pointer
           
            ${
              isValidState && options[state][i]
                ? 'bg-primary_color w-8 scale-x-120'
                : 'bg-[#00000022] w-4 scale-x-100'
            } rounded-full `}
        />
      ))}
    </div>
  )
}

export default OrderBar
