import React from 'react'
import Sidebar from './sidebar'

export const SidebarProvider = ({children}) => {
  return (
    <div>
        <Sidebar />
        {children}
    </div>
  )
}
