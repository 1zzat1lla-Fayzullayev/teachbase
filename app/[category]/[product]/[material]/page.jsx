"use client";
import React, { useEffect, useState } from "react";
import { SidebarProvider } from "../../components/sidebarProvider";
import { MarkdownHooks } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeStarryNight from "rehype-starry-night";

import "github-markdown-css";
import { supabase } from "@/app/supabase/store";
import remarkHeadingIds from "@/app/components/remarkHeading";
import { useParams } from "next/navigation";
import useSWR from "swr";


const fetchMaterial = async () => {
  const { data, error } = await supabase.from("material").select("*");
  if (error) {
    console.error("Ошибка при получении продуктов:", error.message);
  } else {
    
    return data[0];
  }
};

const Page = () => {
  const { material } = useParams();
  const [content, setContent] = useState(``);
  const [title, setTitle] = useState(``);

  const { data: selectedMaterial, error } = useSWR(material, fetchMaterial, {
    revalidateOnFocus: false, // Prevents refetching when switching tabs
  });

    
    console.log("Bu material", material);

    if (error) return <p>Error loading material</p>;
    if (!selectedMaterial) return <p>Loading...</p>;
  


  return (
    <SidebarProvider>
      <article className="material-page w-full break-words flex  min-w-0 justify-center pb-8 ">
        <main className="w-full min-w-0 max-w-6xl px-6 pt-4 md:px-12">
        <h1 className="mt-2 mb-10 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {
            selectedMaterial.title ? selectedMaterial.title : "Данные временно недоступны."
          }
          </h1>
          <div className="markdown-body !bg-[#111] !p-0 prose prose-invert list-disc">
            <MarkdownHooks
              remarkPlugins={[remarkGfm, remarkHeadingIds]}
              rehypePlugins={[rehypeStarryNight]}
            >
              {selectedMaterial.content}
            </MarkdownHooks>
          </div>

          <div className="mt-16"></div>

          <div className="mb-8 flex items-center border-t pt-8 dark:border-neutral-800 contrast-more:border-neutral-400 dark:contrast-more:border-neutral-400 print:hidden">
            <a
              title="Потоки в курсе: Запуск обучения, просмотр результатов"
              className="flex max-w-[50%] items-center gap-1 py-4 text-base font-medium text-gray-600 transition-colors [word-break:break-word] hover:text-[#008ae6] dark:text-gray-300 md:text-lg ltr:ml-auto ltr:pl-4 ltr:text-right rtl:mr-auto rtl:pr-4 rtl:text-left"
              href="#"
            >
              Потоки в курсе: Запуск обучения, просмотр результатов
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
            </a>
          </div>
        </main>
      </article>
    </SidebarProvider>
  );
};

export default Page;
