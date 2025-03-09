"use client";
import React, { useState } from "react";

const data = [
  {
    title: "Курсы",
    items: [
      {
        title:
          "Потоки в курсе: Анкета для самостоятельной регистрации учеников в курс",
      },
    ],
  },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const [openIndices, setOpenIndices] = useState([]);

  const toggleAccordion = (index) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter((i) => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  const [openFat, setOpenFat] = useState([]);

  const toogleOpenFather = (index) => {
    if (openFat.includes(index)) {
      setOpenFat(openFat.filter((i) => i !== index));
    } else {
      setOpenFat([...openFat, index]);
    }
  };

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } transition-all bg-[#111111] text-white sticky left-0 top-[65px] h-[calc(100vh-65px)] md:flex flex-col hidden`}
    >
      <div className="lc overflow-y-auto overflow-x-hidden p-4 grow md:h-[calc(100vh-var(--nextra-navbar-height)-var(--nextra-menu-height))]">
        <div className="lc_child min-w-[224px] transform-gpu overflow-hidden transition-all ease-in-out motion-reduce:transition-none duration-300">
          <div className="lc_child_nevara min-w-[224px] transition-opacity duration-500 ease-in-out motion-reduce:transition-none opacity-100">
            <ul
              className={`flex-col min-w-[224px] gap-1 !max-md:hidden ${
                isOpen ? "flex" : "hidden"
              }`}
            >
              {data.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => toogleOpenFather(index)}
                    className="items-center min-w-[224px] justify-between gap-2 text-left w-full flex rounded px-2 py-1.5 text-sm transition-colors  cursor-pointer contrast-more:border text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-neutral-400 dark:hover:bg-[#E0F2FE]/5 dark:hover:text-gray-50 contrast-more:text-gray-900 contrast-more:dark:text-gray-50 contrast-more:border-transparent contrast-more:hover:border-gray-900 contrast-more:dark:hover:border-gray-50"
                  >
                    {item.title}
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className={` ${
                        openFat.includes(index) ? "rotate-90" : ""
                      } transition-transform h-[18px] min-w-[18px] rounded-sm p-0.5 hover:bg-gray-800/5 dark:hover:bg-gray-100/5`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                        className="origin-center transition-transform rtl:-rotate-180"
                      ></path>
                    </svg>
                  </button>

                  <div
                    className={`cild ${
                      openFat.includes(index) ? "" : "h-[0px]"
                    } transform-gpu overflow-hidden transition-all ease-in-out motion-reduce:transition-none duration-300`}
                  >
                    <div className="child_cild transition-opacity duration-500 ease-in-out motion-reduce:transition-none opacity-100 ltr:pr-0 rtl:pl-0 pt-1">
                      <ul className='flex flex-col gap-1 relative before:absolute before:inset-y-1 before:w-px before:bg-gray-200 before:content-[""] dark:before:bg-neutral-800 ltr:pl-3 ltr:before:left-0 rtl:pr-3 rtl:before:right-0 ltr:ml-3 rtl:mr-3'>
                        {item.items.map((subItem, subIndex) => (
                          <li key={subIndex} className="flex flex-col gap-1">
                            <a
                              className={`${
                                openIndices.includes(subIndex)
                                  ? "!bg-[#172229] !text-[#0282d9] font-semibold"
                                  : ""
                              } flex rounded px-2 py-1.5 text-sm transition-colors [word-break:break-word] cursor-pointer [-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none] contrast-more:border text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-neutral-400 dark:hover:bg-[#E0F2FE]/5 dark:hover:text-gray-50 contrast-more:text-gray-900 contrast-more:dark:text-gray-50 contrast-more:border-transparent contrast-more:hover:border-gray-900 contrast-more:dark:hover:border-gray-50`}
                              onClick={() => toggleAccordion(subIndex)}
                              href="#"
                            >
                              {subItem.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className={`mt-auto py-4 flex ${
          isOpen ? "flex-row border-t border-t-neutral-800" : "flex-col"
        } gap-2 items-center mx-4 text-sm text-center text-neutral-400`}
      >
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
            {isOpen && <span>Русский</span>}
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
            {isOpen && <span className="md:hidden">Системная</span>}
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
      </div>
    </div>
  );
}
