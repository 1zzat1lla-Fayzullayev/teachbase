"use client";
import React, { useEffect, useState } from "react";
import { SidebarProvider } from "../../components/sidebarProvider";
import { MarkdownHooks } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeStarryNight from "rehype-starry-night";

import "github-markdown-css";
import { supabase } from "@/app/supabase/store";
import remarkHeadingIds from "@/app/components/remarkHeading";

const Page = () => {
  const [content, setContent] = useState(``);

  useEffect(() => {
    const fetchMaterial = async () => {
      const { data, error } = await supabase.from("material").select("*");
      if (error) {
        console.error("Ошибка при получении продуктов:", error.message);
      } else {
        setContent(data[0]?.content);
        console.log("dasda", data[0]?.content);
      }
    };
    fetchMaterial();
  }, []);

  return (
    <SidebarProvider>
      <article className="material-page w-full break-words flex  min-w-0 justify-center pb-8 ">
        <main className="w-full min-w-0 max-w-6xl px-6 pt-4 md:px-12">

          <div className="markdown-body !bg-[#111] !p-0 prose prose-invert list-disc">
            <MarkdownHooks
              remarkPlugins={[remarkGfm, remarkHeadingIds]}
              rehypePlugins={[rehypeStarryNight]}
            >
              {content}
            </MarkdownHooks>
          </div>
        </main>
      </article>
    </SidebarProvider>
  );
};

export default Page;
