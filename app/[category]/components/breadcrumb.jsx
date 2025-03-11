"use client";
import { supabase } from "@/app/supabase/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);
  const [titles, setTitles] = useState({});

  useEffect(() => {
    async function fetchTitles() {
      const [{ data: catalogs }, { data: products }, { data: materials }] =
        await Promise.all([
          supabase.from("katalog").select("id, title"),
          supabase.from("product").select("id, title, katolog_id"),
          supabase.from("material").select("id, title, product_id"),
        ]);

      const titleMap = {};

      catalogs?.forEach((item) => (titleMap[`catalog_${item.id}`] = item.title));
      products?.forEach((item) => (titleMap[`product_${item.id}`] = item.title));
      materials?.forEach((item) => (titleMap[`material_${item.id}`] = item.title));


      setTitles(titleMap);
    }

    fetchTitles();
  }, []);


  return (
    <nav
      id="idVverx"
      className="text-sm text-gray-500 mt-[20px] w-full min-w-0 max-w-6xl px-6 md:px-12"
    >
      <ul className="nextra-breadcrumb mt-1.5 flex items-center gap-1 overflow-hidden text-sm text-gray-500 dark:text-gray-400 contrast-more:text-current">
        {/* <li className="whitespace-nowrap transition-colors min-w-[24px] overflow-hidden text-ellipsis">
          <Link href="/">Категория 1</Link>
        </li>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-3.5 shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg> */}
        {pathSegments.map((segment, index) => {
          const path = "/" + pathSegments.slice(0, index + 1).join("/");
          let title = segment; // Default to ID if no match

          const isLast = index === pathSegments.length - 1;
          if (index === 0) title = titles[`catalog_${segment}`] || segment;
          else if (index === 1) title = titles[`product_${segment}`] || segment;
          else if (index === 2) title = titles[`material_${segment}`] || segment;


          return (
            <Fragment key={index}>
              <li className="whitespace-nowrap text-center transition-colors min-w-[24px] overflow-hidden text-ellipsis">
                {isLast ? (
                  <span className="text-gray-700 dark:text-gray-100 font-semibold">
                    {decodeURIComponent(title)}
                  </span>
                ) : (
                  <Link href={'#'} className="text-gray-500 dark:text-gray-400 hover:underline">
                    {decodeURIComponent(title)}
                  </Link>
                )}
              </li>

              {!isLast && (
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-3.5 shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              )}
            </Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
