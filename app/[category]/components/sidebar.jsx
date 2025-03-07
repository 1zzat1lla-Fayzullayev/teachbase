"use client";

import { useState } from "react";
import { Home, Inbox, Calendar, Search, Settings, Menu } from "lucide-react";
import Link from "next/link";

const menuItems = [
  { title: "Home", icon: Home, path: "/" },
  { title: "Inbox", icon: Inbox, path: "/inbox" },
  { title: "Calendar", icon: Calendar, path: "/calendar" },
  { title: "Search", icon: Search, path: "/search" },
  { title: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } transition-all bg-[#111111] text-white fixed left-0 top-[65px] h-[calc(100vh-65px)] flex flex-col`}
    >
      {/* Toggle Button */}

      {/* Menu Items */}
      <nav className="flex-1">
        {menuItems.map(({ title, icon: Icon, path }) => (
          <Link
            key={title}
            href={path}
            className="flex items-center gap-4 p-3 rounded hover:bg-neutral-800 transition"
          >
            {isOpen && <Icon size={24} />}
            {isOpen && <span>{title}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto border-t border-t-neutral-800 py-4 flex flex-row items-center mx-4 gap-2 text-sm text-center text-neutral-400">
        {/* &copy; {new Date().getFullYear()} My App */}

        <button
          title="Change language"
          className="h-7 cursor-pointer rounded-md px-2 text-left text-xs font-medium text-gray-600 transition-colors dark:text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-[#E0F2FE]/5 dark:hover:text-gray-50 grow"
          id="headlessui-listbox-button-:Rjsr6:"
          type="button"
          aria-haspopup="listbox"
          aria-expanded="false"
          data-headlessui-state=""
        >
          <span className="flex items-center gap-2">
            <svg viewBox="2 2 16 16" width="12" height="12" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>Русский</span>
          </span>
        </button>

        <button
          title="Change theme"
          className="h-7 cursor-pointer rounded-md px-2 text-left text-xs font-medium text-gray-600 transition-colors dark:text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-[#E0F2FE]/5 dark:hover:text-gray-50"
          id="headlessui-listbox-button-:Rlsr6:"
          type="button"
          aria-haspopup="listbox"
          aria-expanded="false"
          data-headlessui-state=""
        >
          <div className="flex items-center gap-2 capitalize">
            <svg
              fill="none"
              viewBox="2 2 20 20"
              width="12"
              height="12"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                fill="currentColor"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              ></path>
            </svg>
            <span className="md:hidden">Системная</span>
          </div>
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          title="Hide sidebar"
          className="max-md:hidden  cursor-pointer h-7 rounded-md transition-colors text-gray-600 dark:text-gray-400 px-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-[#E0F2FE]/5 dark:hover:text-gray-50"
        >
          <svg height="12" width="12" viewBox="0 0 16 16" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.177 7.823l2.396-2.396A.25.25 0 017 5.604v4.792a.25.25 0 01-.427.177L4.177 8.177a.25.25 0 010-.354z"
            ></path>
            <path
              fillRule="evenodd"
              d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75zm1.75-.25a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25H9.5v-13H1.75zm12.5 13H11v-13h3.25a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25z"
            ></path>
          </svg>
        </button>
        {/* </button> */}
      </div>
    </div>
  );
}
// Compare this snippet from teachbase/app/components/sidebar.jsx:
