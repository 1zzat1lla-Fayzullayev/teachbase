import React from 'react'
import { SidebarProvider } from './components/sidebarProvider'

const Page = () => {
  return (
    <SidebarProvider>
         <div className='mt-3 text-md px-6 pt-4 md:px-12'>Выберите материал !</div>
    </SidebarProvider>
  )
}

export default Page