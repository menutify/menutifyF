import { useDataGlobalContext } from '@/Context/GlobalContext'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function LoadingBar() {
  const { charge: loading } = useDataGlobalContext()
  const [progress, setProgress] = useState(0)
  const [shouldAnimate, setShouldAnimate] = useState(true)
  const location = useLocation()
  useEffect(() => {
    if (loading) {
      // Inicia la barra de progreso y la detiene al 90%
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 5 : prev))
      }, 10)

      return () => clearInterval(interval)
    } else {
      // Llena la barra al 100% cuando loading es false
      setProgress(100)

      // Resetea la barra después de completarse
      //   const timeout = setTimeout(() => setProgress(0), 500);
      //   return () => clearTimeout(timeout);
    }
  }, [loading])

  useEffect(() => {
    setShouldAnimate(false)
    
    setProgress(0)
    const timeout = setTimeout(() => {
      console.log('first')
      setShouldAnimate(true)
      
      setProgress(100) // Completa la barra

      return () => clearTimeout(timeout)
    }, 100)
  }, [location.pathname])

  return (
    <div className='bg-primary_color'
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '4px',
        
        width: `${progress}%`,
        transition: shouldAnimate ? 'width 0.1s ease-in-out' : 'none',
        zIndex: 9999
      }}
    />
  )
}

export default LoadingBar
