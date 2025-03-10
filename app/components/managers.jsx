"use client"
import React, { useEffect, useState } from "react";
import Wrapper from "../layout/wrapper";
import Link from "next/link";
import Script from "next/script";
import { supabase } from "../supabase/store";

function Managers() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("product").select("*");
      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Wrapper>
        <div className="px-5 flex flex-col items-center my-10">
          <div className="max-w-6xl w-full flex flex-col gap-8">
            <div className="cnts w-full">
              <div className="cr flex flex-col">
                <h4>
                  <Link
                    className="text-2xl text-black dark:text-white"
                    href="#"
                  >
                    Категория 1
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
                      Описание продукта временно отсутствует.
                    </p>
                    <Link
                      className="uppercase mt-auto text-blue-400 font-bold hover:opacity-70"
                      href="#"
                    >
                      Подробнее
                    </Link>
                  </div>
                ))}
              </div>
            </div>
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
