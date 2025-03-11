"use client";
import React, { useEffect, useState } from "react";
import { SidebarProvider } from "../../components/sidebarProvider";
import { MarkdownHooks } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeStarryNight from "rehype-starry-night";

import "github-markdown-css";
import { supabase } from "@/app/supabase/store";
import remarkHeadingIds from "@/app/components/remarkHeading";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";

const fetchMaterial = async (productId) => {
  const { data, error } = await supabase
    .from("material")
    .select("*")
    .eq("product_id", productId)
    .order("id", { ascending: true });
  if (error) {
    console.error("Ошибка при получении продуктов:", error.message);
  } else {
    return data;
  }
};

const Page = () => {
  const { category, product, material } = useParams();
  const [content, setContent] = useState(``);
  const [title, setTitle] = useState(``);
  const router = useRouter();


  const { data: selectedMaterials, error } = useSWR(product, fetchMaterial, {
    revalidateOnFocus: false, // Prevents refetching when switching tabs
    keepPreviousData: true, // Keep the data when revalidating
  });

  const [selectedMaterial, setSelectedMaterial] = useState(null);
  useEffect(() => {
    if (selectedMaterials) {
      const currentMaterial = selectedMaterials.find(
        (m) => m.id.toString() === material
      );
      setSelectedMaterial(currentMaterial);
    }
  }, [material, selectedMaterials]);

  if (error) return <p>Ошибка загрузки материала</p>;
  if (!selectedMaterial) return <p>Загрузка...</p>;

  const currentIndex = selectedMaterials.findIndex((m) => m.id == material);
  const nextMaterial = selectedMaterials[currentIndex + 1];
  const prevMaterial = selectedMaterials[currentIndex - 1];

  return (
    <SidebarProvider>
      <article className="material-page w-full break-words flex  min-w-0 justify-center pb-8 ">
        <main className="w-full min-w-0 max-w-6xl px-6 pt-4 md:px-12">
          <h1 className="mt-2 mb-10 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {selectedMaterial.title
              ? selectedMaterial.title
              : "Данные временно недоступны."}
          </h1>
          <div className="markdown-body !text-[#0f172b] dark:!text-white !bg-[#fff] dark:!bg-[#111] !p-0 prose prose-invert list-disc">
            <MarkdownHooks
              remarkPlugins={[remarkGfm, remarkHeadingIds]}
              rehypePlugins={[rehypeStarryNight]}
            >
              {selectedMaterial.content}
            </MarkdownHooks>
          </div>

          <div className="mt-16"></div>

          <div className="mb-8 flex items-center border-t pt-8 dark:border-neutral-800 contrast-more:border-neutral-400 dark:contrast-more:border-neutral-400 print:hidden">
          {
            prevMaterial && (
              <div
              onClick={() => router.push(`/${category}/${product}/${prevMaterial.id}`, { shallow: true })}
              
              className="flex cursor-pointer max-w-[50%] items-center gap-1 py-4 text-base font-medium text-gray-600 transition-colors [word-break:break-word] hover:text-[#008ae6] dark:text-gray-300 md:text-lg ltr:pr-4 rtl:pl-4"
             
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="inline h-5 shrink-0 ltr:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
              {prevMaterial?.title}
            </div>
            )
          }

           {
            nextMaterial && (
              <div
              className="flex cursor-pointer max-w-[50%] items-center gap-1 py-4 text-base font-medium text-gray-600 transition-colors [word-break:break-word] hover:text-[#008ae6] dark:text-gray-300 md:text-lg ltr:ml-auto ltr:pl-4 ltr:text-right rtl:mr-auto rtl:pr-4 rtl:text-left"
              
              onClick={() => router.push(`/${category}/${product}/${nextMaterial.id}`, { shallow: true })}
            >
              {/* Потоки в курсе: Запуск обучения, просмотр результатов */}
              {nextMaterial?.title}
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="inline h-5 shrink-0 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </div>
            )
           }
          </div>
        </main>
      </article>
    </SidebarProvider>
  );
};

export default Page;
