"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "../layout/wrapper";
import Link from "next/link";
import Script from "next/script";
import { supabase } from "../supabase/store";

function Managers() {
  const [products, setProducts] = useState([]);
  const [katalog, setKatalog] = useState([]);
  const [catalogNames, setCatalogNames] = useState({});

  const [groupedProducts, setGroupedProducts] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("product").select("*");
      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
        setGroupedProducts(groupByCatalog(data));
        console.log(groupByCatalog(data));

        console.log(data);
      }
    };

    const fetchKatalog = async () => {
      const { data, error } = await supabase.from("katalog").select("*");
      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setKatalog(data);
        console.log(data);
        const catalogMap = data.reduce((acc, catalog) => {
          acc[catalog.id] = catalog.title;
          return acc;
        }, {});
        console.log("saas ", catalogMap);

        setCatalogNames(catalogMap);
      }
    };

    fetchKatalog();
    fetchProducts();
  }, []);

  function groupByCatalog(products) {
    return products.reduce((acc, product) => {
      const { katolog_id } = product;
      if (!acc[katolog_id]) {
        acc[katolog_id] = [];
      }
      acc[katolog_id].push(product);
      return acc;
    }, {});
  }

  return (
    <>
      <Wrapper>
        <div className="px-5 flex flex-col items-center my-10">
          <div className="max-w-6xl w-full flex flex-col gap-8">
            {Object.entries(groupedProducts).map(([katalogId, products]) => (
              <div key={katalogId} className="cnts w-full">
                <div className="cr flex flex-col">
                  <h4>
                    <Link
                      className="text-2xl text-black dark:text-white"
                      href={`/${katalogId}`}
                    >
                      {/* Категория 1 */}
                      {catalogNames[katalogId] ||
                        "Категория временно недоступна."}
                    </Link>
                  </h4>
                </div>
                <div className="content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="carde sm:w-full lg:max-w-[370px] border rounded-2xl flex flex-col dark:text-gray-100 bg-white dark:bg-[#111] drop-shadow-lg p-5 border-gray-200"
                    >
                      <h5 className="text-xl font-light mb-5 text-black dark:text-white">
                        {product.title}
                      </h5>
                      <p className="text-sm leading-normal mb-5 text-black dark:text-white">
                        {/* Описание продукта временно отсутствует. */}
                        {product.description ||
                          "Описание продукта временно отсутствует."}
                      </p>
                      <Link
                        className="uppercase mt-auto text-blue-400 font-bold hover:opacity-70"
                        href={`/${katalogId}`}
                      >
                        {product.description.length} статьи
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Wrapper>

      <Script
        id="messenger-widget-b"
        src="https://cdn.botpenguin.com/website-bot.js"
        strategy="lazyOnload"
      />
    </>
  );
}

export default Managers;
