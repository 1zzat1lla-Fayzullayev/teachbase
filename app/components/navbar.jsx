"use client";
import React, { useState, useRef, useEffect, useTransition } from "react";
import Wrapper from "../layout/wrapper";
import Link from "next/link";
import { useTheme } from "next-themes";
import { searchMaterials } from "../lib/action";
import { useRouter } from "next/navigation";

function Navbar() {
  const { theme, setTheme } = useTheme();

  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const searchInputRef = useRef(null);
  const [openIndices, setOpenIndices] = useState([]);
  const [openFat, setOpenFat] = useState([]);
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = async (e) => {
    // e.preventDefault();
    if (!e) return;

    startTransition(async () => {
      const data = await searchMaterials(e);
      setResults(data);
      console.log("da:", data);
    });
  };

  const data = [
    {
      title: "Курсы",
      items: [
        {
          title: "Katalog1",
          items: [
            {
              title: "Katalog1 title",
            },
            {
              title: "Katalog2 title",
            },
          ],
        },
        {
          title: "Katalog2",
          items: [
            {
              title: "Katalog3 title",
            },
            {
              title: "Katalog4 title",
            },
          ],
        },
      ],
    },
  ];

  const focusSearchInput = () => searchInputRef.current?.focus();
  const clearSearch = () => {
    searchInputRef.current?.blur();
    setSearchValue("");
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        clearSearch();
      }
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        focusSearchInput();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const toggleAccordion = (index) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter((i) => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  const toogleOpenFather = (index) => {
    if (openFat.includes(index)) {
      setOpenFat(openFat.filter((i) => i !== index));
    } else {
      setOpenFat([...openFat, index]);
    }
  };

  return (
    <>
      <div className="bg-transparent h-[65px]">
        <Wrapper>
          <div className="px-6 fixed w-full left-0 top-0 py-[15px] border-b border-b-[#9ca3af33] flex justify-between items-center z-[999] backdrop-blur-[40px]">
            <Link href="/">
              <img
                src={theme == "light" ? "/lightLogo.svg" : "/logo.svg"}
                className="cursor-pointer"
                alt="Logo"
              />
            </Link>
            <ul className="items-center gap-5 hidden md:flex">
              {["Категория 1", "Категория 2", "Категория 3", "Категория 4"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="/catalog/new/test"
                      className="text-[#4b5563] dark:text-[#9ca3af] text-nowrap text-[14px] hover:text-black dark:hover:text-white"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
              <li className="w-full max-w-[256px] relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value),
                      handleSearch(e.target.value);
                  }}
                  placeholder="Найти..."
                  className="bg-[#0000000d] dark:bg-[#f9fafb1a] px-3 py-[7px] transition-all text-sm border-none lg:w-[256px] rounded-lg focus:bg-[#0000000d] dark:focus:bg-[#111111] text-gray-500 placeholder:text-gray-400 dark:text-gray-300 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <kbd className="absolute top-0 my-1.5 select-none ltr:right-1.5 rtl:left-1.5 h-5 rounded bg-white px-1.5 font-mono text-[10px] font-medium text-gray-500 border dark:border-gray-100/20 dark:bg-[#111111]/50 contrast-more:border-current contrast-more:text-current contrast-more:dark:border-current items-center gap-1 pointer-events-none hidden sm:flex opacity-100">
                  {searchValue ? "ESC" : "CTRL K"}
                </kbd>

                {(results.length == 0 && searchValue !== "") && (
                  <ul className="nextra-scrollbar border border-gray-200 bg-white text-gray-100 dark:border-neutral-800 dark:bg-neutral-900 absolute top-full z-20 mt-2 overflow-auto overscroll-contain rounded-xl py-2.5 shadow-xl max-h-[min(calc(50vh-11rem-env(safe-area-inset-bottom)),400px)] md:max-h-[min(calc(100vh-5rem-env(safe-area-inset-bottom)),400px)] inset-x-0 ltr:md:left-auto rtl:md:right-auto contrast-more:border contrast-more:border-gray-900 contrast-more:dark:border-gray-50 w-screen min-h-[100px] max-w-[min(calc(100vw-2rem),calc(100%+20rem))]">
                    <span className="block select-none p-8 text-center text-sm text-gray-400">
                      Ничего не найдено.
                    </span>
                  </ul>
                )}

                {(results.length > 0 && searchValue !== "") && (
                  <ul className="nextra-scrollbar border border-gray-200 bg-white text-gray-100 dark:border-neutral-800 dark:bg-neutral-900 absolute top-full z-20 mt-2 overflow-auto overscroll-contain rounded-xl py-2.5 shadow-xl max-h-[min(calc(50vh-11rem-env(safe-area-inset-bottom)),400px)] md:max-h-[min(calc(100vh-5rem-env(safe-area-inset-bottom)),400px)] inset-x-0 ltr:md:left-auto rtl:md:right-auto contrast-more:border contrast-more:border-gray-900 contrast-more:dark:border-gray-50 w-screen min-h-[100px] max-w-[min(calc(100vw-2rem),calc(100%+20rem))]">
                    {results.map((item, index) => (
                      <li
                        key={index}
                        className="mx-2.5 break-words rounded-md contrast-more:border hover:bg-[#3B82F6]/10 cursor-pointer hover:text-[#2563EB] contrast-more:border-[#3B82F6]"
                      >
                        <a 
                          onClick={() => {(item.type === "material") && router.push(`/${item.katalog_id}/${item.product_id}/${item.id}`,  { shallow: true }), clearSearch()}}
                        className="block scroll-m-12 px-2.5 py-2">
                          <div
                            className="text-base font-semibold leading-5"
                            dangerouslySetInnerHTML={{ __html: item.title }}
                          />
                          {item.snippet && (
                            <p
                              className="mt-1 text-sm leading-[1.35rem] text-gray-600 dark:text-gray-400 contrast-more:dark:text-gray-50"
                              dangerouslySetInnerHTML={{ __html: item.snippet }}
                            />
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
            <div
              className={`burger ${
                isMobileOpen ? "open" : ""
              } block md:!hidden`}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-[25px] h-[2px] rounded-full bg-black dark:bg-white transition-all"
                ></div>
              ))}
            </div>
          </div>
        </Wrapper>
      </div>

      <div
        className={`fixed inset-0 z-[998] bg-white dark:bg-[#111111] bg-opacity-80 transform ${
          isMobileOpen ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-300 flex px-[10px] flex-col w-full pt-[80px] gap-6`}
      >
        <div className="overflow-y-auto overflow-x-hidden p-4 grow md:h-[calc(100vh-var(--nextra-navbar-height)-var(--nextra-menu-height))] nextra-scrollbar">
          <input
            ref={searchInputRef}
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Найти..."
            className="bg-[#0000000d] dark:bg-[#f9fafb1a] px-3 py-[7px] transition-all text-sm border-none w-full rounded-lg focus:bg-[#0000000d] dark:focus:bg-[#111111] text-gray-500 placeholder:text-gray-400 dark:text-gray-300 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ul className="flex flex-col gap-1 nextra-menu-mobile md:hidden mt-3">
            {data.map((item, index) => (
              <li
                key={index}
                className={openIndices.includes(index) ? "open" : ""}
              >
                <button
                  className="items-center justify-between gap-2 text-left w-full flex rounded px-2 py-1.5 text-sm transition-colors cursor-pointer text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-neutral-400 dark:hover:bg-[#E0F2FE]/5 dark:hover:text-gray-50 contrast-more:text-gray-900 contrast-more:dark:text-gray-50 contrast-more:border-transparent contrast-more:hover:border-gray-900 contrast-more:dark:hover:border-gray-50"
                  onClick={() => toggleAccordion(index)}
                >
                  {item.title}
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-[18px] min-w-[18px] rounded-sm p-0.5 hover:bg-gray-800/5 dark:hover:bg-gray-100/5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                      className={`origin-center transition-transform ${
                        openIndices.includes(index) ? "rotate-90" : ""
                      }`}
                    />
                  </svg>
                </button>
                {openIndices.includes(index) && item.items && (
                  <div className="overflow-hidden transition-all ease-in-out duration-300">
                    <ul className="flex flex-col gap-1 pl-4 border-l border-gray-200 dark:border-neutral-800">
                      {item.items.map((subItem, subIndex) => (
                        <li key={subIndex} className="relative">
                          <button
                            className="flex w-full justify-between items-center text-left rounded px-2 py-1.5 text-sm transition-colors cursor-pointer text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-neutral-400 dark:hover:bg-[#E0F2FE]/5 dark:hover:text-gray-50 contrast-more:text-gray-900 contrast-more:dark:text-gray-50 contrast-more:border-transparent contrast-more:hover:border-gray-900 contrast-more:dark:hover:border-gray-50"
                            onClick={() =>
                              toggleAccordion(`${index}-${subIndex}`)
                            }
                          >
                            {subItem.title}
                            <svg
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="h-[18px] min-w-[18px] rounded-sm p-0.5 hover:bg-gray-800/5 dark:hover:bg-gray-100/5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                                className={`origin-center transition-transform ${
                                  openIndices.includes(`${index}-${subIndex}`)
                                    ? "rotate-90"
                                    : ""
                                }`}
                              />
                            </svg>
                          </button>
                          {openIndices.includes(`${index}-${subIndex}`) &&
                            subItem.items && (
                              <ul className="pl-4 border-l border-gray-300 dark:border-neutral-700">
                                {subItem.items.map(
                                  (nestedItem, nestedIndex) => (
                                    <li
                                      key={nestedIndex}
                                      className="text-sm text-gray-500 dark:text-neutral-400 px-2 py-1"
                                    >
                                      {nestedItem.title}
                                    </li>
                                  )
                                )}
                              </ul>
                            )}
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
    </>
  );
}

export default Navbar;
