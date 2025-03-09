"use client";
import React from "react";
import Sidebar from "./sidebar";

import { useState } from "react";
import AboutPage from "./aboutPage";
import Wrapper from "@/app/layout/wrapper";
import Breadcrumb from "./breadcrumb";

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Wrapper>
      <div className="flex flex-row">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex flex-row justify-between w-full">
          <div>
            <Breadcrumb />
            {children}
          </div>

          <div>
            <AboutPage />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
