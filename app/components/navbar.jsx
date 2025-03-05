import React from "react";
import Wrapper from "../layout/wrapper";

function Navbar() {
  return (
    <>
      <div className="bg-transparent">
        <Wrapper>
          <div className="px-6 py-[10px] border-b border-b-[#9ca3af33] flex justify-between items-center">
            <img src="/logo.svg" className="cursor-pointer" />
            <ul className="flex items-center gap-5">
              <li>
                <a
                  href="#"
                  className="text-[#9ca3af] text-[14px] hover:text-white"
                >
                  Менеджерам обучения
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#9ca3af] text-[14px] hover:text-white"
                >
                  Ученикам обучения
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#9ca3af] text-[14px] hover:text-white"
                >
                  Общая информация
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#9ca3af] text-[14px] hover:text-white"
                >
                  Видеоинструкции
                </a>
              </li>
              <li>
                <input
                  type="text"
                  placeholder="Найти..."
                  className="px-3 py-[5px] rounded-lg bg-[#f9fafb1a] focus:bg-[#111111]  text-gray-700 dark:text-gray-300 placeholder-gray-500  border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </li>
            </ul>
          </div>
        </Wrapper>
      </div>
    </>
  );
}

export default Navbar;
