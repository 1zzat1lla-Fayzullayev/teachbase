"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

const Footer = () => {
  const pathname = usePathname();

  const [showM, setShowM] = useState(0);
  const [acc, setAcc] = useState(3);

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer className="bg-gray-100 mt-auto dark:bg-neutral-900  print:bg-transparent">
      {pathname === "/" && (
        <div className="tp mx-auto flex max-w-[90rem] gap-2 py-2 px-4">
          <button
            onClick={() => setShowM(showM == 1 ? 0 : 1)}
            className="text-gray-600 relative transition-all font-medium text-xs text-left px-2 rounded-md h-7 cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-800 dark:text-gray-400 dark:hover:text-gray-100"
          >
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

            {showM == 1 && (
              <ul
                className="z-20 absolute top-[-50px] left-[-5px] max-h-64 overflow-auto rounded-md ring-1 ring-black/5 bg-white py-1 text-sm shadow-lg dark:ring-white/20 dark:bg-neutral-800"
                ariaLabelledby="headlessui-listbox-button-:Rkt6:"
                ariaOrientation="vertical"
                id="headlessui-listbox-options-:r0:"
                role="listbox"
                tabIndex="0"
                dataHeadlessuiState="open"
                dataPopperPlacement="top-start"
                // style="position: fixed; inset: auto auto 0px 0px; margin: 0px; transform: translate3d(105px, -167px, 0px); min-width: 96.2656px;"
              >
                <li
                  className="hover:bg-[#E0F7FA] hover:text-[#0288D1] dark:hover:bg-[#0288D1]/10 text-gray-800 dark:text-gray-100 relative cursor-pointer whitespace-nowrap py-1.5 transition-colors ltr:pl-3 ltr:pr-9 rtl:pr-3 rtl:pl-9"
                  id="headlessui-listbox-option-:r3:"
                  role="option"
                  tabIndex="-1"
                  
                  aria-selected="false"
                  dataHeadlessuiState=""
                  onClick={() =>   setShowM(0)}
                >
                  русский
                  <span className="absolute inset-y-0 flex items-center ltr:right-3 rtl:left-3">
                    <svg
                      viewBox="0 0 20 20"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </li>
              </ul>
            )}
          </button>

          <button
            onClick={() => setShowM(showM == 2 ? 0 : 2)}
            className="text-gray-600 relative transition-all font-medium text-xs text-left px-2 rounded-md h-7 cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-800 dark:text-gray-400 dark:hover:text-gray-100"
          >
            <div className="flex items-center gap-2">
              {theme === "light" ? (
                <svg
                  fill="none"
                  viewBox="3 3 18 18"
                  width="12"
                  height="12"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    fill="currentColor"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                </svg>
              ) : (
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
              )}

              <span>
                {
                  acc == 1 ? "Светлая" :
                  acc == 2 ? "Тёмная" : "Системная"
                }
                
                </span>
            </div>

            {showM == 2 && (
              <ul
                className="z-20 absolute top-[-108px] left-[-5px] max-h-64 overflow-auto rounded-md ring-1 ring-black/5 bg-white py-1 text-sm shadow-lg dark:ring-white/20 dark:bg-neutral-800"
                ariaLabelledby="headlessui-listbox-button-:Rkt6:"
                ariaOrientation="vertical"
                id="headlessui-listbox-options-:r0:"
                role="listbox"
                tabIndex="0"
                
                dataPopperPlacement="top-start"
                // style="position: fixed; inset: auto auto 0px 0px; margin: 0px; transform: translate3d(105px, -167px, 0px); min-width: 96.2656px;"
              >
                <li
                  className="hover:bg-[#E0F7FA] hover:text-[#0288D1] dark:hover:bg-[#0288D1]/10 text-gray-800 dark:text-gray-100 relative cursor-pointer whitespace-nowrap py-1.5 transition-colors ltr:pl-3 ltr:pr-9 rtl:pr-3 rtl:pl-9"
                  id="headlessui-listbox-option-:r1:"
                  role="option"
                  tabIndex="-1"
                  aria-selected="false"
                  onClick={() => (setTheme("light"), setAcc(1), setShowM(0))}
                >
                  Светлая
                  {acc == 1 && (
                    <span className="absolute inset-y-0 flex items-center ltr:right-3 rtl:left-3">
                      <svg
                        viewBox="0 0 20 20"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  )}
                </li>
                <li
                  className="hover:bg-[#E0F7FA] hover:text-[#0288D1] dark:hover:bg-[#0288D1]/10 text-gray-800 dark:text-gray-100 relative cursor-pointer whitespace-nowrap py-1.5 transition-colors ltr:pl-3 ltr:pr-9 rtl:pr-3 rtl:pl-9"
                  id="headlessui-listbox-option-:r2:"
                  role="option"
                  tabIndex="-1"
                  aria-selected="false"
                  onClick={() => (setTheme("dark"), setAcc(2), setShowM(0))}
                >
                  Тёмная
                  {acc == 2 && (
                    <span className="absolute inset-y-0 flex items-center ltr:right-3 rtl:left-3">
                      <svg
                        viewBox="0 0 20 20"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  )}
                </li>
                <li
                  className="hover:bg-[#E0F7FA] hover:text-[#0288D1] dark:hover:bg-[#0288D1]/10 text-gray-800 dark:text-gray-100 relative cursor-pointer whitespace-nowrap py-1.5 transition-colors ltr:pl-3 ltr:pr-9 rtl:pr-3 rtl:pl-9"
                  id="headlessui-listbox-option-:r3:"
                  role="option"
                  tabIndex="-1"
                  aria-selected="false"
                  onClick={() => (setTheme("system"), setAcc(3), setShowM(0))}
                >
                  Системная
                  {acc == 3 && (
                    <span className="absolute inset-y-0 flex items-center ltr:right-3 rtl:left-3">
                      <svg
                        viewBox="0 0 20 20"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  )}
                </li>
              </ul>
            )}
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
