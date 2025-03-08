"use client";
import { supabase } from "@/app/supabase/store";
import { EditIcon, TrashIcon } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const Page = () => {
  const [userPassword, setUserPassword] = useState("");
  const [activeTable, setActiveTable] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [newItem, setNewItem] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newM, setNewM] = useState("");
  const [newMDesc, setNewMDesc] = useState("");
  const [selectedCatalog, setSelectedCatalog] = useState("");
  const [selectedCatalogM, setSelectedCatalogM] = useState("");
  const [selectedPrdM, setSelectedPrdM] = useState("");
  const [items, setItems] = useState({ Каталог: [], Продукты: [], Материалы: [] });
  const refInput = useRef(null);

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
    if (!newItem.trim() || !newDescription.trim()) return;

    const { data, error } = await supabase
      .from("katalog")
      .insert([{ title: newItem, description: newDescription }]);

    if (error) {
      console.error("Ошибка при добавлении каталога:", error.message);
      return;
    }

    setItems((prev) => ({
      ...prev,
      Каталог: [...prev.Каталог, { title: newItem, description: newDescription }],
    }));
    setNewItem("");
    setNewDescription("");
    setModalOpen(false);
  };

  const addProduct = async () => {
    if (!newItem.trim() || !selectedCatalog) return;

    const { data, error } = await supabase
      .from("product")
      .insert([{ title: newItem, katolog_id: selectedCatalog }]);

    if (error) {
      console.error("Ошибка при добавлении продукта:", error.message);
      return;
    }

    setItems((prev) => ({
      ...prev,
      Продукты: [...prev.Продукты, { title: newItem, katolog_id: selectedCatalog }],
    }));
    setNewItem("");
    setSelectedCatalog("");
    setModalOpen(false);
  };

  const addMaterial = async () => {
    if (!newM.trim() || !selectedCatalogM) return;

    const { data, error } = await supabase
      .from("material")
      .insert([{ title: newM, katolog_id: selectedCatalogM, product_id: selectedPrdM, description: newMDesc }]);

    if (error) {
      console.error("Ошибка при добавлении продукта:", error.message);
      return;
    }

    setItems((prev) => ({
      ...prev,
      Материалы: [...prev.Материалы, { title: newM, katolog_id: selectedCatalogM, product_id: selectedPrdM, description: newMDesc }],
    }));
    setNewM("");
    setNewMDesc("");
    setSelectedCatalogM("");
    setSelectedPrdM("");
    setModalOpen(false);
  };


  const handleDelete = async (id, table, tbl) => {
    await supabase.from(table).delete().eq("id", id);
    setItems((prev) => ({
      ...prev,
      [tbl]: prev[tbl].filter((item) => item.id !== id),
    }));
  };


  const handleEdit = async (id, table, updatedData) => {
    const { data, error } = await supabase.from(table).update(updatedData).eq("id", id);
    if (!error) {
      setItems((prev) => ({
        ...prev,
        [table]: prev[table].map((item) => (item.id === id ? { ...item, ...updatedData } : item)),
      }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full flex flex-col md:flex-row">
        {loggedIn ? (
          <>
            <aside className="bg-neutral-900 w-full md:w-[250px] lg:w-[350px] h-auto md:h-screen fixed md:static top-0 p-6 z-10 flex flex-col rounded-[10px]">
              <nav className="mt-10 flex flex-col gap-3">
                {["Каталог", "Продукты", "Материалы"].map((item) => (
                  <button
                    key={item}
                    className={`p-2 text-left rounded-md transition-all font-bold uppercase text-sm md:text-base cursor-pointer ${
                      activeTable === item ? "bg-blue-500 text-white" : "bg-neutral-800 text-gray-300"
                    }`}
                    onClick={() => setActiveTable(item)}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </aside>

            <div className="flex-1 mt-10 md:ml-6 p-4">
              <div className="flex flex-row items-center justify-between">
              <h2 className="text-lg font-bold flex-1">{activeTable}</h2>
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
              <ul className="mt-4 space-y-2">
                {items[activeTable]?.map((item, index) => (
                  <li key={index} className="border p-2 rounded-md text-center md:text-left">
                    {item.title || item} {item.description && `<|> (Описание: ${item.description})`} {item.product_id && `<|> (Ид продукта: ${item.product_id})`} {item.katolog_id && `<|> (Ид каталога: ${item.katolog_id})`} 

                    <span className="flex gap-2">
                      <EditIcon className="mt-1 w-4 h-4"/>

                      <TrashIcon onClick={()=> handleDelete(item.id, activeTable ===  "Каталог" ? 'katalog': activeTable === "Продукты" ? "product":"material", activeTable)} className="mt-1 w-4 h-4"/>
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
           {
            modalType !== "Материалы" && (
              <input
              type="text"
              placeholder="Название"
              className="w-full p-2 border rounded mb-4 bg-gray-700 text-white"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            )
           }
            {modalType === "Каталог" && (
              <input
                type="text"
                placeholder="Описание"
                className="w-full p-2 border rounded mb-4 bg-gray-700 text-white"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            )}
            {modalType === "Продукты" && (
              <select
                className="w-full p-2 border rounded mb-4 bg-gray-700 text-white"
                value={selectedCatalog}
                onChange={(e) => setSelectedCatalog(e.target.value)}
              >
                <option value="">Выберите каталог</option>
                {items["Каталог"].map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.title}</option>
                ))}
              </select>
            )}

{modalType === "Материалы" && (
             <>
                 <input
              type="text"
              placeholder="Название"
              className="w-full p-2 border rounded mb-4 bg-gray-700 text-white"
              value={newM}
              onChange={(e) => setNewM(e.target.value)}
            />

<textarea
              type="text"
              placeholder="Описание"
              className="w-full p-2 border rounded mb-4 bg-gray-700 text-white"
              value={newMDesc}
              onChange={(e) => setNewMDesc(e.target.value)}
            />
              <select
                className="w-full p-2 border rounded mb-4 bg-gray-700 text-white"
                value={selectedCatalogM}
                onChange={(e) => setSelectedCatalogM(e.target.value)}
              >
                <option value="">Выберите каталог</option>
                {items["Каталог"].map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.title}</option>
                ))}
              </select>

              <select
                className="w-full p-2 border rounded mb-4 bg-gray-700 text-white"
                value={selectedPrdM}
                onChange={(e) => setSelectedPrdM(e.target.value)}
              >
                <option value="">Выберите продукт</option>
                {items["Продукты"].map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.title}</option>
                ))}
              </select>
             </>
            )}
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={modalType === "Каталог" ? addCatalog : modalType === "Продукты" ? addProduct : addMaterial}>Сохранить</button>
            <button className="px-4 py-2 ml-2 bg-white text-blue-500 rounded-lg" onClick={()=> setModalOpen(false)}>Отмена</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
