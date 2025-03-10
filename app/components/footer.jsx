"use client";

import React from "react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  return (
    <footer className="bg-gray-100 mt-auto dark:bg-neutral-900  print:bg-transparent">
      {pathname === "/" && (
        <div className="tp mx-auto flex max-w-[90rem] gap-2 py-2 px-4">
          <button className="text-gray-600 transition-all font-medium text-xs text-left px-2 rounded-md h-7 cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-800 dark:text-gray-400 dark:hover:text-gray-100">
            <div className="flex items-center gap-2">
              <svg
                viewBox="2 2 16 16"
                width="12"
                height="12"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>Русский</span>
            </div>
          </button>
          <button className="text-gray-600 transition-all font-medium text-xs text-left px-2 rounded-md h-7 cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-800 dark:text-gray-400 dark:hover:text-gray-100">
            <div className="flex items-center gap-2">
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
              <span>Системная</span>
            </div>
          </button>
        </div>
      )}
      <hr className="dark:border-neutral-800 border-gray-200" />

      <div className="mx-auto flex max-w-[90rem] justify-center py-12 px-6 text-gray-600 dark:text-gray-400 md:justify-start">
        <div>
          <p className="text-md">© 2025 Teachbase</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
