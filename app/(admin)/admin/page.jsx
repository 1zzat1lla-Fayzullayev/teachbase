"use client";
import React, { useState, useEffect, useRef } from "react";

const Page = () => {
  const [userPassword, setUserPassword] = useState("");
  const [activeTable, setActiveTable] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [items, setItems] = useState({ Katalog: [], Nmadr1: [], Nmadr2: [] });
  const refInput = useRef(null);

  const loggedIn = () => userPassword === "password";

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!userPassword && e.key === "Escape") {
        e.preventDefault();
        focusOut();
      }
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        focusTO();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [userPassword]);

  const focusTO = () => refInput.current?.focus();
  const focusOut = () => {
    refInput.current?.blur();
    setUserPassword("");
  };

  const menuItems = ["Katalog", "Nmadr1", "Nmadr2"];

  const addItem = (item) => {
    setItems((prev) => ({
      ...prev,
      [activeTable]: [...prev[activeTable], item],
    }));
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full flex flex-col md:flex-row">
        {loggedIn() ? (
          <>
            <aside className="bg-neutral-900 w-full md:w-[250px] lg:w-[350px] h-auto md:h-screen fixed md:static top-0 p-6 z-10 flex flex-col rounded-[10px]">
              <nav className="mt-10 flex flex-col gap-3">
                {menuItems.map((item) => (
                  <button
                    key={item}
                    className={`p-2 text-left rounded-md transition-all font-bold uppercase text-sm md:text-base cursor-pointer 
                      ${
                        activeTable === item
                          ? "bg-blue-500 text-white"
                          : "bg-neutral-800 text-gray-300"
                      }`}
                    onClick={() => setActiveTable(item)}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </aside>


            <div className="flex-1 mt-10 md:ml-6 p-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg w-full md:w-auto"
                onClick={() => setModalOpen(true)}
                disabled={!activeTable}
              >
                Add
              </button>
              <ul className="mt-4 space-y-2">
                {items[activeTable]?.map((item, index) => (
                  <li
                    key={index}
                    className="bg-gray-200 p-2 rounded-md text-center md:text-left"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center w-full">
            <div className="w-full max-w-[256px] relative">
              <input
                ref={refInput}
                type="password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                placeholder="Password..."
                className="px-3 py-[7px] transition-all text-sm border-none lg:w-[256px] rounded-lg bg-[#f9fafb1a] focus:bg-[#111111]  text-gray-500 placeholder:text-gray-400 dark:text-gray-300  border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <kbd className="absolute top-0 my-1.5 select-none ltr:right-1.5 rtl:left-1.5 h-5 rounded bg-white px-1.5 font-mono text-[10px] font-medium text-gray-500 border dark:border-gray-100/20 dark:bg-[#111111]/50 contrast-more:border-current contrast-more:text-current contrast-more:dark:border-current items-center gap-1 pointer-events-none hidden sm:flex opacity-100">
                {userPassword ? "ESC" : "CTRL K"}
              </kbd>
            </div>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 p-4">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md text-white">
            <h2 className="text-lg font-bold mb-4">Yangi element qo'shish</h2>
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 border rounded mb-4 bg-gray-700 text-white"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value) {
                  addItem(e.target.value);
                  e.target.value = "";
                }
              }}
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                onClick={() => setModalOpen(false)}
              >
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
