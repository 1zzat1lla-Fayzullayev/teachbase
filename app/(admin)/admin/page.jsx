"use client";
import { supabase } from "@/app/supabase/store";
import { EditIcon, TrashIcon, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";

const Page = () => {
  const [userPassword, setUserPassword] = useState("");
  const [activeTable, setActiveTable] = useState(null);
  const [activeItemId, setActiveItemId] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [modalType, setModalType] = useState("");
  const [newItem, setNewItem] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newM, setNewM] = useState("");
  const [newMDesc, setNewMDesc] = useState(``);
  const [selectedCatalog, setSelectedCatalog] = useState("");
  const [selectedCatalogM, setSelectedCatalogM] = useState("");
  const [selectedPrdM, setSelectedPrdM] = useState("");
  const [items, setItems] = useState({
    Каталог: [],
    Продукты: [],
    Материалы: [],
  });
  const refInput = useRef(null);
  const router = useRouter();


  const loggedIn = userPassword === "admin123";

  useEffect(() => {
    const fetchCatalogs = async () => {
      const { data, error } = await supabase.from("katalog").select("*");
      if (error) {
        console.error("Ошибка при получении каталогов:", error.message);
      } else {
        setItems((prev) => ({ ...prev, Каталог: data }));
      }
    };

    const fetchProducts = async () => {
      const { data, error } = await supabase.from("product").select("*");
      if (error) {
        console.error("Ошибка при получении продуктов:", error.message);
      } else {
        setItems((prev) => ({ ...prev, Продукты: data }));
      }
    };

    const fetchMaterial = async () => {
      const { data, error } = await supabase.from("material").select("*");
      if (error) {
        console.error("Ошибка при получении продуктов:", error.message);
      } else {
        setItems((prev) => ({ ...prev, Материалы: data }));
      }
    };

    if (loggedIn) {
      fetchCatalogs();
      fetchProducts();
      fetchMaterial();
    }
  }, [loggedIn]);

  const addCatalog = async () => {
    if (!newItem.trim()) return;

    const { data, error } = await supabase
      .from("katalog")
      .insert([{ title: newItem, description: "" }]);

    if (error) {
      console.error("Ошибка при добавлении каталога:", error.message);
      return;
    }

    setItems((prev) => ({
      ...prev,
      Каталог: [...prev.Каталог, { title: newItem, description: "" }],
    }));
    setNewItem("");
    setModalOpen(false);
    router.refresh(); 

  };

  const addProduct = async () => {
    if (!newItem.trim() || !selectedCatalog || !newDescription.trim()) return;

    const { data, error } = await supabase
      .from("product")
      .insert([
        {
          title: newItem,
          katolog_id: selectedCatalog,
          description: newDescription,
        },
      ]);

    if (error) {
      console.error("Ошибка при добавлении продукта:", error.message);
      return;
    }

    setItems((prev) => ({
      ...prev,
      Продукты: [
        ...prev.Продукты,
        {
          title: newItem,
          katolog_id: selectedCatalog,
          description: newDescription,
        },
      ],
    }));
    setNewItem("");
    setSelectedCatalog("");
    setNewDescription("");
    setModalOpen(false);
    router.refresh(); 

  };

  const addMaterial = async () => {
    if (!newM.trim() || !selectedCatalogM) return;

    const { data, error } = await supabase.from("material").insert([
      {
        title: newM,
        katolog_id: selectedCatalogM,
        product_id: selectedPrdM,
        content: newMDesc,
      },
    ]);

    if (error) {
      console.error("Ошибка при добавлении продукта:", error.message);
      return;
    }

    setItems((prev) => ({
      ...prev,
      Материалы: [
        ...prev.Материалы,
        {
          title: newM,
          katolog_id: selectedCatalogM,
          product_id: selectedPrdM,
          content: newMDesc,
        },
      ],
    }));
    setNewM("");
    setNewMDesc("");
    setSelectedCatalogM("");
    setSelectedPrdM("");
    setModalOpen(false);
    router.refresh(); 
  };

  const handleDelete = async (id, table, tbl) => {
    await supabase.from(table).delete().eq("id", id);
    setItems((prev) => ({
      ...prev,
      [tbl]: prev[tbl].filter((item) => item.id !== id),
    }));
  };

  const handleEdit = async (id, table, updatedData, tbl) => {
    const { data, error } = await supabase
      .from(tbl)
      .update(updatedData)
      .eq("id", id);
    if (!error) {
      setItems((prev) => ({
        ...prev,
        [table]: prev[table].map((item) =>
          item.id === id ? { ...item, ...updatedData } : item
        ),
      }));
      setModalOpenEdit(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full flex flex-col md:flex-row">
        {loggedIn ? (
          <>
            <aside className="bg-neutral-900 w-full md:w-[250px] lg:w-[350px] h-auto md:h-screen relative md:static top-0 left-0 p-6 z-10 flex flex-col rounded-[10px]">
              <nav className="md:mt-10 flex flex-col gap-3">
                {["Каталог", "Продукты", "Материалы"].map((item) => (
                  <button
                    key={item}
                    className={`p-2 text-left rounded-md transition-all font-bold uppercase text-sm md:text-base cursor-pointer ${
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
              <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between">
                {activeTable && (
                  <h2 className="text-lg font-bold flex gap-2 md:gap-1 flex-row md:flex-col">
                    {activeTable}{" "}
                    <EditIcon
                      onClick={() => setModalOpenEdit(true)}
                      className="mt-1 w-5 h-5 cursor-pointer"
                    />
                  </h2>
                )}
                <button
                  className="px-4 py-2 cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed bg-blue-500 text-white rounded-lg w-full md:w-auto"
                  onClick={() => {
                    setModalOpen(true);
                    setModalType(activeTable);
                  }}
                  disabled={!activeTable}
                >
                  Добавить
                </button>
              </div>

              {activeTable === "Материалы" && (
                <div className="flex flex-col text-sm my-2 font-mono">
                  <p>
                    Пожалуйста, ознакомьтесь с документами перед созданием
                    контента для страницы материалов,{" "}
                    <Link
                      href={
                        "https://docs.github.com/ru/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
                      }
                      className="underline cursor-pointer"
                    >
                      ссылка (кликните)
                    </Link>
                  </p>
                  <Link
                    href={"/admin/ssa/"}
                    className="underline cursor-pointer"
                  >
                    Предварительный просмотр вашего контента можно увидеть на
                    этой странице. (нажмите)
                  </Link>
                </div>
              )}
              <ul className="mt-4 space-y-2">
                {items[activeTable]?.map((item, index) => (
                  <li
                    key={index}
                    className="border p-2 rounded-md text-center md:text-left"
                  >
                    {item.title || item}{" "}
                    {item.description && `<|> (Описание: ${item.description})`}{" "}
                    {item.product_id && `<|> (Ид продукта: ${item.product_id})`}{" "}
                    {item.katolog_id && `<|> (Ид каталога: ${item.katolog_id})`}
                    <span className="flex gap-2">
                      <TrashIcon
                        onClick={() =>
                          handleDelete(
                            item.id,
                            activeTable === "Каталог"
                              ? "katalog"
                              : activeTable === "Продукты"
                              ? "product"
                              : "material",
                            activeTable
                          )
                        }
                        className="mt-1 w-4 h-4 cursor-pointer"
                      />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center w-full">
            <input
              ref={refInput}
              type="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="Пароль..."
              className="px-3 py-[7px] transition-all text-sm border-none lg:w-[256px] rounded-lg bg-[#f9fafb1a] focus:bg-[#111111] text-gray-500 placeholder:text-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 p-4">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md text-white">
            <h2 className="text-lg font-bold mb-4">Добавить {modalType}</h2>
            {modalType !== "Материалы" && (
              <input
                type="text"
                placeholder="Название"
                className="w-full p-2 border rounded mb-4 bg-gray-800 text-white"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
              />
            )}
            {modalType === "Продукты" && (
              <input
                type="text"
                placeholder="Описание"
                className="w-full p-2 border rounded mb-4 bg-gray-800 text-white"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            )}
            {modalType === "Продукты" && (
              <select
                className="w-full p-2 border rounded mb-4 bg-gray-800 text-white"
                value={selectedCatalog}
                onChange={(e) => setSelectedCatalog(e.target.value)}
              >
                <option value="">Выберите каталог</option>
                {items["Каталог"].map((cat, index) => (
                  <option key={index} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>
            )}

            {modalType === "Материалы" && (
              <>
                <input
                  type="text"
                  placeholder="Название"
                  className="w-full p-2 bg-gray-800 border border-gray-700 mb-2 text-white"
                  value={newM}
                  onChange={(e) => setNewM(e.target.value)}
                />

                <textarea
                  className="w-full h-40 p-2 mb-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newMDesc}
                  onChange={(e) => setNewMDesc(e.target.value)}
                  placeholder="Напишите здесь свою контент..."
                />
                <select
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded mb-4 text-white"
                  value={selectedCatalogM}
                  onChange={(e) => setSelectedCatalogM(e.target.value)}
                >
                  <option value="">Выберите каталог</option>
                  {items["Каталог"].map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
                {items["Продукты"].some((pim) => pim.katolog_id == selectedCatalogM) && (
  <select
    className="w-full p-2 border border-gray-700 rounded mb-4 bg-gray-800 text-white"
    value={selectedPrdM}
    onChange={(e) => setSelectedPrdM(e.target.value)}
  >
    <option value="">Выберите продукт</option>
    {items["Продукты"]
      .filter((pim) => pim.katolog_id !== selectedCatalogM) // ✅ Corrected condition
      .map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.title}
        </option>
      ))}
  </select>
)}
              </>
            )}
            <button
              className="px-4 py-2 cursor-pointer  disabled:cursor-not-allowed bg-blue-500 text-white rounded-lg"
              onClick={
                modalType === "Каталог"
                  ? addCatalog
                  : modalType === "Продукты"
                  ? addProduct
                  : addMaterial
              }
              disabled={!(items["Продукты"].some((pim) => pim.katolog_id == selectedCatalogM))}
            >
              Сохранить
            </button>
            <button
              className="px-4 py-2 cursor-pointer ml-2 bg-white text-blue-500 rounded-lg"
              onClick={() => setModalOpen(false)}
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      {modalOpenEdit && (
        <div className="fixed top-[65px] inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 p-4">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md text-white">
            <div className="flex flex-row justify-between">
              <h2 className="text-lg font-bold mb-4">
                Редактировать {activeTable}
              </h2>
              <X
                onClick={() => setModalOpenEdit(false)}
                className="mt-1 w-5 h-5 cursor-pointer"
              />
            </div>
            {items[activeTable]?.length > 0 && (
              <>
                {/* Select which item to edit */}
                <select
                  className="w-full p-2 border rounded bg-gray-800 text-white"
                  value={activeItemId}
                  onChange={(e) => setActiveItemId(e.target.value)}
                >
                  <option value="">Выберите элемент</option>
                  {items[activeTable].map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>

                <hr className="my-3" />
              </>
            )}

            {activeItemId && (
              <>
                {(() => {
                  const activeItem = items[activeTable]?.find(
                    (item) => item.id == activeItemId
                  );

                  if (!activeItem) return null;

                  return (
                    <>
                      <p>Заголовок</p>
                      <input
                        type="text"
                        placeholder="..."
                        className="w-full p-2 border rounded mb-4 bg-gray-800 text-white"
                        value={activeItem.title || ""}
                        onChange={(e) =>
                          setItems((prevItems) => ({
                            ...prevItems,
                            [activeTable]: prevItems[activeTable].map((item) =>
                              item.id == activeItemId
                                ? { ...item, title: e.target.value }
                                : item
                            ),
                          }))
                        }
                      />

                      {activeTable === "Продукты" && (
                        <>
                          <p>Описание</p>
                          <input
                            type="text"
                            placeholder="Описание"
                            className="w-full p-2 border rounded mb-4 bg-gray-800 text-white"
                            value={activeItem.description || ""}
                            onChange={(e) =>
                              setItems((prevItems) => ({
                                ...prevItems,
                                [activeTable]: prevItems[activeTable].map(
                                  (item) =>
                                    item.id == activeItemId
                                      ? { ...item, description: e.target.value }
                                      : item
                                ),
                              }))
                            }
                          />
                        </>
                      )}

                      {activeTable === "Материалы" && (
                        <>
                          <p>Содержимое</p>
                          <textarea
                            type="text"
                            placeholder="Содержимое"
                            className="w-full h-40 p-2 mb-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={activeItem.content || ""}
                            onChange={(e) =>
                              setItems((prevItems) => ({
                                ...prevItems,
                                [activeTable]: prevItems[activeTable].map(
                                  (item) =>
                                    item.id == activeItemId
                                      ? { ...item, content: e.target.value }
                                      : item
                                ),
                              }))
                            }
                          />
                        </>
                      )}

                      {activeTable !== "Каталог" && (
                        <>
                          <p>Каталог</p>
                          <select
                            className="w-full p-2 border rounded mb-4 bg-gray-800 text-white"
                            value={activeItem.katolog_id || ""}
                            onChange={(e) =>
                              setItems((prevItems) => ({
                                ...prevItems,
                                [activeTable]: prevItems[activeTable].map(
                                  (item) =>
                                    item.id == activeItemId
                                      ? { ...item, katolog_id: e.target.value }
                                      : item
                                ),
                              }))
                            }
                          >
                            <option value="">Выберите каталог</option>
                            {items["Каталог"].map((cat) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.title}
                              </option>
                            ))}
                          </select>

                          <p>Продукт</p>
                          <select
                            className="w-full p-2 border rounded mb-4 bg-gray-800 text-white"
                            value={activeItem.product_id || ""}
                            onChange={(e) =>
                              setItems((prevItems) => ({
                                ...prevItems,
                                [activeTable]: prevItems[activeTable].map(
                                  (item) =>
                                    item.id == activeItemId
                                      ? { ...item, product_id: e.target.value }
                                      : item
                                ),
                              }))
                            }
                          >
                            <option value="">Выберите продукт</option>
                            {items["Продукты"].map((product) => (
                              <option key={product.id} value={product.id}>
                                {product.title}
                              </option>
                            ))}
                          </select>
                        </>
                      )}

                      <button
                        className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded-lg"
                        onClick={() =>
                          handleEdit(
                            activeItemId,
                            activeTable,
                            activeItem,
                            activeTable === "Каталог"
                              ? "katalog"
                              : activeTable === "Продукты"
                              ? "product"
                              : "material"
                          )
                        }
                      >
                        Сохранить
                      </button>
                      <button
                        className="px-4 py-2 cursor-pointer ml-2 bg-white text-blue-500 rounded-lg"
                        onClick={() => setModalOpenEdit(false)}
                      >
                        Отмена
                      </button>
                    </>
                  );
                })()}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
