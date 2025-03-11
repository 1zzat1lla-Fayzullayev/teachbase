"use client";
import { supabase } from "@/app/supabase/store";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const fetchDataP = async () => {
  const { data, error } = await supabase.from("product").select("*");

  console.log(data);
  return data;
};

const fetchDataM = async () => {
  const { data, error } = await supabase.from("material").select("*");

  console.log(data);
  return data;
};

export default function Sidebar({ isOpen, setIsOpen }) {
  const { category, product, material } = useParams();

  const { data: materials, errorM } = useSWR("material", fetchDataM, {
    revalidateOnFocus: false,
  });
  const { data: products, errorP } = useSWR("product", fetchDataP, {
    revalidateOnFocus: false,
  });

  const [showM, setShowM] = useState(0);

  const [acc, setAcc] = useState(3);

  const { theme, setTheme } = useTheme();

  const [openIndices, setOpenIndices] = useState();
  const [openFat, setOpenFat] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (materials) {
      const currentMaterial = materials.find(
        (m) => m.id.toString() === material
      );
      if (currentMaterial) {
        setOpenIndices(currentMaterial.id);
        setOpenFat([...openFat, currentMaterial.product_id]);
      }
    }
  }, [material, materials]);

  if (errorM) return <p>Ошибка загрузки материала.</p>;
  if (!materials) return <p className="w-[320px]">Загрузка...</p>;
  if (errorP) return <p>Ошибка загрузки.</p>;
  if (!products) return <p className="w-[320px]">Загрузка...</p>;

  const toggleAccordion = (index) => {
    setOpenIndices(index);
  };

  //
  //
  //

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
      } transition-all bg-white dark:bg-[#111111] text-white sticky left-0 top-[65px] h-[calc(100vh-65px)] md:flex flex-col hidden`}
    >
      <div className="lc overflow-y-auto overflow-x-hidden p-4 grow md:h-[calc(100vh-var(--nextra-navbar-height)-var(--nextra-menu-height))]">
        <div className="lc_child min-w-[224px] transform-gpu overflow-hidden transition-all ease-in-out motion-reduce:transition-none duration-300">
          <div className="lc_child_nevara min-w-[224px] transition-opacity duration-500 ease-in-out motion-reduce:transition-none opacity-100">
            <ul
              className={`flex-col min-w-[224px] gap-1 !max-md:hidden ${
                isOpen ? "flex" : "hidden"
              }`}
            >
              {products.map((product, index) => (
                <li key={index}>
                  <button
                    onClick={() => toogleOpenFather(product.id)}
                    className="items-center min-w-[224px] justify-between gap-2 text-left w-full flex rounded px-2 py-1.5 text-sm transition-colors  cursor-pointer contrast-more:border text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-neutral-400 dark:hover:bg-[#E0F2FE]/5 dark:hover:text-gray-50"
                  >
                    {product.title}
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className={` ${
                        openFat.includes(product.id) ? "rotate-90" : ""
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

                  {openFat && (
                    <div
                      className={`cild ${
                        openFat.includes(product.id) ? "" : "h-[0px]"
                      } transform-gpu overflow-hidden transition-all ease-in-out motion-reduce:transition-none duration-300`}
                    >
                      <ul className='flex flex-col gap-1 relative before:absolute before:inset-y-1 before:w-px before:bg-gray-200 before:content-[""] dark:before:bg-neutral-800 ltr:pl-3 ltr:before:left-0 rtl:pr-3 rtl:before:right-0 ltr:ml-3 rtl:mr-3'>
                        {materials
                          .filter((itm) => itm.product_id == product.id)
                          ?.map((subItem, subIndex) => (
                            <li
                              key={subItem.id || subIndex}
                              className="flex flex-col gap-1"
                            >
                              <div
                                className={`${
                                  openIndices == subItem.id
                                    ? "!bg-[#e0efff] dark:!bg-[#172229] !text-[#004ca3] dark:!text-[#0282d9]  font-semibold"
                                    : ""
                                } text-[#6b7280] dark:text-white flex rounded px-2 py-1.5 text-sm transition-colors cursor-pointer`}
                                onClick={() => {
                                  toggleAccordion(subItem.id),
                                    router.push(
                                      `/${product.katolog_id}/${product.id}/${subItem.id}`,
                                      { shallow: true }
                                    );
                                }}
                              >
                                {subItem.title}
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className={`mt-auto py-4 flex ${
          isOpen
            ? "flex-row border-t border-t-gray-200 dark:border-t-neutral-800"
            : "flex-col"
        } gap-2 items-center mx-4 text-sm text-center text-neutral-400`}
      >
        <button
          title="Change language"
          className="h-7 cursor-pointer relative rounded-md px-2 text-left text-xs font-medium text-gray-600 transition-colors dark:text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-[#E0F2FE]/5 dark:hover:text-gray-50 grow"
          id="headlessui-listbox-button-:Rjsr6:"
          type="button"
          aria-haspopup="listbox"
          aria-expanded="false"
          data-headlessui-state=""
          onClick={() => setShowM(showM == 1 ? 0 : 1)}
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
          {showM == 1 && (
            <ul
              className="z-20 absolute top-[-50px] left-[-5px] max-h-64 overflow-auto rounded-md ring-1 ring-black/5 bg-white py-1 text-sm shadow-lg dark:ring-white/20 dark:bg-neutral-800"
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
                id="headlessui-listbox-option-:r3:"
                role="option"
                tabIndex="-1"
                aria-selected="false"
                onClick={() => setShowM(0)}
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
                      fillRule="evenodd"
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
          title="Change theme"
          className="h-7 cursor-pointer relative rounded-md px-2 text-left text-xs font-medium text-gray-600 transition-colors dark:text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-[#E0F2FE]/5 dark:hover:text-gray-50"
          id="headlessui-listbox-button-:Rlsr6:"
          type="button"
          aria-haspopup="listbox"
          aria-expanded="false"
          data-headlessui-state=""
          onClick={() => setShowM(showM == 2 ? 0 : 2)}
        >
          <div className="flex items-center gap-2 capitalize">
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
            {isOpen && (
              <span>
                {acc == 1 ? "Светлая" : acc == 2 ? "Тёмная" : "Системная"}
              </span>
            )}
          </div>

          {showM == 2 && (
            <ul
              className="z-20 absolute top-[-108px] left-[-5px] max-h-64 overflow-auto rounded-md ring-1 ring-black/5 bg-white py-1 text-sm shadow-lg dark:ring-white/20 dark:bg-neutral-800"
              aria-labelledby="headlessui-listbox-button-:Rkt6:"
              aria-orientation="vertical"
              id="headlessui-listbox-options-:r0:"
              role="listbox"
              tabIndex="0"
              datapopperplacement="top-start"
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
                        fillRule="evenodd"
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
                        fillRule="evenodd"
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
                        fillRule="evenodd"
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
