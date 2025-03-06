"use client";
import React from "react";
import Wrapper from "../layout/wrapper";

function Navbar() {
  const [value, setValue] = React.useState("");

  const refInput = React.useRef(null);

  const focusTO = () => {
    refInput.current.focus();
  };

  const focusOut = () => {
    refInput.current.blur();
    setValue("");
  };

  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (!value) {
        if (e.key === "Escape") {
          e.preventDefault();
       
          focusOut();
          
        }
      }

      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();

        focusTO();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>
      <div className="bg-transparent h-[65px]">
        <Wrapper>
          <div className="px-6 fixed w-full left-0 top-0 py-[15px] border-b border-b-[#9ca3af33] flex justify-between items-center">
            <img src="/logo.svg" className="cursor-pointer" />
            <ul className="flex items-center gap-5">
              <li>
                <a
                  href="#"
                  className="text-[#9ca3af] text-nowrap text-[14px] hover:text-white"
                >
                  Категория 1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#9ca3af] text-nowrap text-[14px] hover:text-white"
                >
                  Категория 2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#9ca3af] text-nowrap text-[14px] hover:text-white"
                >
                  Категория 3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#9ca3af] text-nowrap text-[14px] hover:text-white"
                >
                  Категория 4
                </a>
              </li>
              <li className="w-full max-w-[256px] relative">
                <input
                  ref={refInput}
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Найти..."
                  className="px-3 py-[7px] transition-all text-sm border-none w-[256px] rounded-lg bg-[#f9fafb1a] focus:bg-[#111111]  text-gray-500 placeholder:text-gray-400 dark:text-gray-300  border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <kbd className="absolute top-0 my-1.5 select-none ltr:right-1.5 rtl:left-1.5 h-5 rounded bg-white px-1.5 font-mono text-[10px] font-medium text-gray-500 border dark:border-gray-100/20 dark:bg-[#111111]/50 contrast-more:border-current contrast-more:text-current contrast-more:dark:border-current items-center gap-1 pointer-events-none hidden sm:flex opacity-100">
                  {
                    value ? "ESC":"CTRL K"
                  }
                </kbd>
              </li>
            </ul>
          </div>
        </Wrapper>
      </div>
    </>
  );
}

export default Navbar;
