"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <nav className="text-sm text-gray-500 mt-[20px]">
      <ul className="flex items-center space-x-2">
        <li>
          <Link href="/" className="text-[#9ca3af] text-[17px]">
            Менеджерам обучения
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const path = "/" + pathSegments.slice(0, index + 1).join("/");
          const isLast = index === pathSegments.length - 1;

          return (
            <li key={index} className="flex items-center text-[17px]">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 mx-2 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
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
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
