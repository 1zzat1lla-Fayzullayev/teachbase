"use client";
import React, { useState, useRef, useEffect, useTransition } from "react";
import Wrapper from "../layout/wrapper";
import Link from "next/link";
import { useTheme } from "next-themes";
import { searchMaterials } from "../lib/action";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../supabase/store";

function Navbar() {
  const { theme, setTheme } = useTheme();
  const { category } = useParams();

  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const searchInputRef = useRef(null);
  const [openIndices, setOpenIndices] = useState([]);
  const [openFat, setOpenFat] = useState([]);
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [products, setProducts] = useState([]);
  const [materials, setMaterials] = useState([]);

  const [katalogs, setKatalogs] = useState([]);
  const [activeM, setActiveM] = useState(0);

  const handleSearch = async (e) => {
    // e.preventDefault();
    if (!e) return;

    startTransition(async () => {
      const data = await searchMaterials(e);
      setResults(data);
      console.log("da:", data);
    });
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("product").select("*");
    if (error) {
      console.error("Ошибка при получении продуктов:", error.message);
    } else {
      setProducts(data);
    }
  };

  const fetchMaterials = async () => {
    const { data, error } = await supabase.from("material").select("*");
    if (error) {
      console.error("Ошибка при получении продуктов:", error.message);
    } else {
      setMaterials(data);
    }
  };

  const fetchMaterial = async () => {
    const { data, error } = await supabase.from("katalog").select("*");
    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setKatalogs(data);
    }
  };

  useEffect(() => {
    fetchMaterial();
  }, [!katalogs]);

  useEffect(() => {
    fetchProducts();
    fetchMaterials();
  }, []);

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
              {katalogs.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      router.push(`/${item.id}`, { shallow: true });
                    }}
                    className={`${
                      item.id == category
                        ? "!text-[#000000] dark:!text-white !font-semibold"
                        : ""
                    } text-[#4b5563] cursor-pointer dark:text-[#9ca3af] text-nowrap text-[14px] hover:text-black dark:hover:text-white`}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
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

                {results.length == 0 && searchValue !== "" && (
                  <ul className="nextra-scrollbar border border-gray-200 bg-white text-gray-100 dark:border-neutral-800 dark:bg-neutral-900 absolute top-full z-20 mt-2 overflow-auto overscroll-contain rounded-xl py-2.5 shadow-xl max-h-[min(calc(50vh-11rem-env(safe-area-inset-bottom)),400px)] md:max-h-[min(calc(100vh-5rem-env(safe-area-inset-bottom)),400px)] inset-x-0 ltr:md:left-auto rtl:md:right-auto contrast-more:border contrast-more:border-gray-900 contrast-more:dark:border-gray-50 w-screen min-h-[100px] max-w-[min(calc(100vw-2rem),calc(100%+20rem))]">
                    <span className="block select-none p-8 text-center text-sm text-gray-400">
                      Ничего не найдено.
                    </span>
                  </ul>
                )}

                {results.length > 0 && searchValue !== "" && (
                  <ul className="nextra-scrollbar border border-gray-200 bg-white text-gray-100 dark:border-neutral-800 dark:bg-neutral-900 absolute top-full z-20 mt-2 overflow-auto overscroll-contain rounded-xl py-2.5 shadow-xl max-h-[min(calc(50vh-11rem-env(safe-area-inset-bottom)),400px)] md:max-h-[min(calc(100vh-5rem-env(safe-area-inset-bottom)),400px)] inset-x-0 ltr:md:left-auto rtl:md:right-auto contrast-more:border contrast-more:border-gray-900 contrast-more:dark:border-gray-50 w-screen min-h-[100px] max-w-[min(calc(100vw-2rem),calc(100%+20rem))]">
                    {results.map((item, index) => (
                      <li
                        key={index}
                        className="mx-2.5 break-words rounded-md contrast-more:border hover:bg-[#3B82F6]/10 cursor-pointer hover:text-[#2563EB] contrast-more:border-[#3B82F6]"
                      >
                        <a
                          onClick={() => {
                            item.type === "material" &&
                              router.push(
                                `/${item.katalog_id}/${item.product_id}/${item.id}`,
                                { shallow: true }
                              ),
                              clearSearch();
                          }}
                          className="block scroll-m-12 px-2.5 py-2"
                        >
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
            onChange={(e) => {
              setSearchValue(e.target.value), handleSearch(e.target.value);
            }}
            placeholder="Найти..."
            className="bg-[#0000000d] dark:bg-[#f9fafb1a] px-3 py-[7px] transition-all text-sm border-none w-full rounded-lg focus:bg-[#0000000d] dark:focus:bg-[#111111] text-gray-500 placeholder:text-gray-400 dark:text-gray-300 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {results.length == 0 && searchValue !== "" && (
            <ul className="nextra-scrollbar border border-gray-200 bg-white text-gray-100 dark:border-neutral-800 dark:bg-neutral-900 absolute top-[120px] left-0 right-0 mx-auto z-[999] mt-2 overflow-auto overscroll-contain rounded-xl py-2.5 shadow-xl max-h-[min(calc(50vh-11rem-env(safe-area-inset-bottom)),400px)] md:max-h-[min(calc(100vh-5rem-env(safe-area-inset-bottom)),400px)] inset-x-0 ltr:md:left-auto rtl:md:right-auto contrast-more:border contrast-more:border-gray-900 contrast-more:dark:border-gray-50 w-screen min-h-[100px] max-w-[min(calc(100vw-2rem),calc(100%+20rem))]">
              <span className="block select-none p-8 text-center text-sm text-gray-400">
                Ничего не найдено.
              </span>
            </ul>
          )}

          {results.length > 0 && searchValue !== "" && (
            <ul className="nextra-scrollbar border border-gray-200 bg-white text-gray-100 dark:border-neutral-800 dark:bg-neutral-900 absolute top-[120px] left-0 right-0 mx-auto z-[999] mt-2 overflow-auto overscroll-contain rounded-xl py-2.5 shadow-xl max-h-[min(calc(50vh-11rem-env(safe-area-inset-bottom)),400px)] md:max-h-[min(calc(100vh-5rem-env(safe-area-inset-bottom)),400px)] inset-x-0 ltr:md:left-auto rtl:md:right-auto contrast-more:border contrast-more:border-gray-900 contrast-more:dark:border-gray-50 w-screen min-h-[100px] max-w-[min(calc(100vw-2rem),calc(100%+20rem))]">
              {results.map((item, index) => (
                <li
                  key={index}
                  className="mx-2.5 break-words rounded-md contrast-more:border hover:bg-[#3B82F6]/10 cursor-pointer hover:text-[#2563EB] contrast-more:border-[#3B82F6]"
                >
                  <a
                    onClick={() => {
                      item.type === "material" &&
                        router.push(
                          `/${item.katalog_id}/${item.product_id}/${item.id}`,
                          { shallow: true }
                        ),
                        clearSearch();
                    }}
                    className="block scroll-m-12 px-2.5 py-2"
                  >
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

          <ul className="flex flex-col gap-1 nextra-menu-mobile md:hidden mt-3">
            {katalogs.map((product, index) => (
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
                      {products
                        .filter((itm) => itm.katolog_id == product.id)
                        ?.map((subItem, subIndex) => (
                          <li
                            key={subItem.id || subIndex}
                            className="flex flex-col gap-1"
                            
                          >
                            <button 
                            onClick={() => toggleAccordion(subItem.id)}
                            className="items-center justify-between gap-2 text-left w-full flex rounded px-2 py-1.5 text-sm transition-colors [word-break:break-word] cursor-pointer [-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none] contrast-more:border text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-neutral-400 dark:hover:bg-blue-100/5 dark:hover:text-gray-50 contrast-more:text-gray-900 contrast-more:dark:text-gray-50 contrast-more:border-transparent contrast-more:hover:border-gray-900 contrast-more:dark:hover:border-gray-50">
                              {subItem.title}
                              <svg
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className={` ${
                                  openIndices.includes(subItem.id)
                                    ? "rotate-90"
                                    : ""
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
                            {/* <div
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
                            </div> */}

                            <div
                              className={`${
                                openIndices.includes(subItem.id)
                                  ? ""
                                  : "h-[0px]"
                              }  transform-gpu overflow-hidden transition-all ease-in-out motion-reduce:transition-none duration-300`}
                            >
                              <div className="transition-opacity duration-500 ease-in-out motion-reduce:transition-none opacity-100 ltr:pr-0 rtl:pl-0 pt-1">
                                <ul className='flex flex-col gap-1 relative before:absolute before:inset-y-1 before:w-px before:bg-gray-200 before:content-[""] dark:before:bg-neutral-800 ltr:pl-3 ltr:before:left-0 rtl:pr-3 rtl:before:right-0 ltr:ml-3 rtl:mr-3'>
                                  {materials
                                    .filter((mk) => mk.product_id == subItem.id)
                                    .map((cm, mcI) => (
                                      <li
                                        key={mcI}
                                        onClick={() => {setActiveM(cm.id), setIsMobileOpen(false), router.push(`${product.id}/${subItem.id}/${cm.id}`)}}
                                        className="flex flex-col gap-1"
                                      >
                                        <div className={`${activeM == cm.id ? "!bg-blue-100 !font-semibold !text-blue-800 dark:!bg-blue-400/10 dark:!text-blue-600":""} flex rounded px-2 py-1.5 text-sm transition-colors [word-break:break-word] cursor-pointer [-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none] contrast-more:border text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-neutral-400 dark:hover:bg-blue-100/5 dark:hover:text-gray-50 contrast-more:text-gray-900 contrast-more:dark:text-gray-50 contrast-more:border-transparent contrast-more:hover:border-gray-900 contrast-more:dark:hover:border-gray-50`}>
                                          {cm.title}
                                        </div>
                                      </li>
                                    ))}
                                </ul>
                              </div>
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
    </>
  );
}

export default Navbar;
