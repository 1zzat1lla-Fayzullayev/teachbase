"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <nav id="idVverx" className="text-sm text-gray-500 mt-[20px] w-full min-w-0 max-w-6xl px-6 md:px-12" >
      <ul className="nextra-breadcrumb mt-1.5 flex items-center gap-1 overflow-hidden text-sm text-gray-500 dark:text-gray-400 contrast-more:text-current">
        <li className="whitespace-nowrap transition-colors min-w-[24px] overflow-hidden text-ellipsis">
          <Link href="/">
            Менеджерам обучения
          </Link>
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
            </svg>
        {pathSegments.map((segment, index) => {
          const path = "/" + pathSegments.slice(0, index + 1).join("/");
          const isLast = index === pathSegments.length - 1;

          return (
          <>
            <li key={index} className="whitespace-nowrap transition-colors min-w-[24px] overflow-hidden text-ellipsis">
             
             {isLast ? (
               <span className="text-white font-semibold">
                 {decodeURIComponent(segment)}
               </span>
             ) : (
               <Link href={path} className="text-white hover:underline">
                 {decodeURIComponent(segment)}
               </Link>
             )}
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
            </svg>
            
           
                     </>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
