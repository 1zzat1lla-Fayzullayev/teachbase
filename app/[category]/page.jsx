import React from 'react'
import { SidebarProvider } from './components/sidebarProvider'

const Page = () => {
  return (
    <SidebarProvider>
         <div className='mt-3 text-md'>Выберите материал !</div>
    </SidebarProvider>
  )
}

export default Page