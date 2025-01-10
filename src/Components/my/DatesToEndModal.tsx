import { Link, useLocation } from 'react-router-dom'
import Parr1 from './Parr1'
import { useEffect, useState } from 'react'
import { useDataGlobalContext } from '@/Context/GlobalContext'

function DatesToEndModal() {
   const {subDetails}= useDataGlobalContext()
    const [visibility, setVisibility] = useState('hidden')
    const location= useLocation()
    useEffect(()=>{
        
        
        if(subDetails?.days<36 && location.pathname!='/dashboard/account'){
            setVisibility('fixed')
        }else{
            setVisibility('hidden')
        }
    },[subDetails?.days])

    useEffect(()=>{
       
        
        if(location.pathname=='/dashboard/account'){
           
            setVisibility('hidden')
        }
    },[location.pathname])

    const setHiddenModal=()=>{
        setVisibility('hidden')
    }
  return (
    <div className={`${visibility} top-0 left-0 right-0 m-auto w-full max-w-[500px] h-10 bg-red-50 z-10 flex justify-between items-center`}>
        <div className='flex-complete'>

        <Parr1 >Su suscripcion vencera en {subDetails?.days} días</Parr1>
        <Link to={'/dashboard/account'}>Pagar</Link>
        </div>
        <button className='border rounded-full border-black w-5 h-5 flex-complete' onClick={setHiddenModal}>X</button>
    </div>
  )
}

export default DatesToEndModal