"use client";
import React from 'react'
import Sidebar from './sidebar'


import { useState } from "react";


export const SidebarProvider = ({children}) => {
  const [isOpen, setIsOpen] = useState(true);


  return (
    <div className='flex flex-row'>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
     <div>
      
     {children}
        
     </div>
    </div>
  )
}
