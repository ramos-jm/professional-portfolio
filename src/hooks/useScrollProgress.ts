import { useState, useEffect } from 'react'
import { getLenis } from './useLenis'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateFromNative = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const denom = scrollHeight - clientHeight
      setProgress(denom > 0 ? scrollTop / denom : 0)
    }

    const lenis = getLenis()
    let lenisHandler: ((event: { progress: number }) => void) | null = null

    if (lenis) {
      lenisHandler = ({ progress }) => {
        setProgress(progress)
      }
      lenis.on('scroll', lenisHandler)
    } else {
      window.addEventListener('scroll', updateFromNative, { passive: true })
    }

    window.addEventListener('resize', updateFromNative)
    updateFromNative()

    return () => {
      if (lenis && lenisHandler) {
        lenis.off('scroll', lenisHandler)
      }
      window.removeEventListener('scroll', updateFromNative)
      window.removeEventListener('resize', updateFromNative)
    }
  }, [])

  return progress
}
