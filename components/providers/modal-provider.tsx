'use client'
import { useState, useEffect } from 'react'
import { CreateServerModal } from '@/components/modals'

export const ModalProvider = () => {

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if(!isMounted) return null

  return (
    <>
      {/* <InitialModal/> */}
      <CreateServerModal/>
    </>
  )
}