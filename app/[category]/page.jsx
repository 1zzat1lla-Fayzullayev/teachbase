import React from 'react'
import { SidebarProvider } from './components/sidebarProvider'

const Page = () => {
  return (
    <SidebarProvider>
         <div>Page 1</div>
    </SidebarProvider>
  )
}

export default Page