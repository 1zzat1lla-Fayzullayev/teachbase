"use client";
import { supabase } from "@/app/supabase/store";
import { slugify } from "@/app/utils/util";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function AboutPage() {
  const [content, setContent] = useState("");
  const { category, product, material } = useParams();


  const [headings, setHeadings] = useState([]);

  const [activeHeading, setActiveHeading] = useState("");

  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    const fetchMaterial = async () => {
      const { data, error } = await supabase.from("material").select("*").eq("id", material).single();
      if (error) {
        console.error("Ошибка при получении продуктов:", error.message);
      } else {
        setContent(data.content);
      }
    };
    fetchMaterial();
  }, []);

  useEffect(() => {
    // Extract headings (## Heading)
    const extractedHeadings =
      content
        .match(/^##\s+(.*)/gm)
        ?.map((line) => line.replace(/^##\s+/, "")) || [];

    setHeadings(extractedHeadings);
  }, [content]);


  useEffect(() => {
    const handleScroll = () => {
      let currentHeading = "";

      for (let i = 0; i < headings.length; i++) {
        const element = document.getElementById(slugify(headings[i]));
        const nextElement = document.getElementById(slugify(headings[i + 1])); // Next heading

        if (element) {
          const rect = element.getBoundingClientRect();
          const nextRect = nextElement ? nextElement.getBoundingClientRect() : null;

          // Keep the heading active until the next one enters the screen
          if (rect.top <= 200 && (!nextRect || nextRect.top > 200)) {
            currentHeading = headings[i];
            break;
          }
        }
      }

      setActiveHeading(slugify(currentHeading));

      if (window.scrollY > 330) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = document.querySelector(".navbar")?.offsetHeight || 65; 
  
      window.scrollTo({
        top: element.offsetTop - navbarHeight - 20,
        behavior: "smooth",
      });
    }
  };
  

  const scrollToTop = () => {
    
    
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
      setActiveHeading("");
    
  };


  return (
    <div className="bg-transparent sticky top-[65px] right-0 w-[250px] h-[calc(100vh-65px)] p-4 hidden xl:block">
      <p className="mb-4 font-semibold tracking-tight">На этой странице</p>
      <ul className="space-y-1">
        {headings.map((link, index) => (
          <li
            className="cursor-pointer my-2 scroll-my-6 scroll-py-6"
            onClick={() => scrollToHeading(slugify(link))}
            key={index}
          >
            <a
              className={`font-semibold inline-block ${
                activeHeading == slugify(link) ? "!text-[#008ae6]" : ""
              } text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 contrast-more:text-gray-900 contrast-more:underline contrast-more:dark:text-gray-50 w-full break-words`}
            >
              {link}
            </a>
            
          </li>
        ))}
      </ul>
      <div className="mt-8 border-t bg-white pt-8 shadow-[0_-12px_16px_white] dark:bg-[#111111] dark:shadow-[0_-12px_16px_#111] sticky bottom-0 flex flex-col items-start gap-2 pb-8 dark:border-neutral-800 contrast-more:border-t contrast-more:border-neutral-400 contrast-more:shadow-none contrast-more:dark:border-neutral-400">
       {
        isVisible && (
          <button
          onClick={() => scrollToTop()}
          aria-hidden="true"
          className="flex cursor-pointer items-center gap-1.5 transition text-xs font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 contrast-more:text-gray-800 contrast-more:dark:text-gray-50"
        >
          Наверх
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="-rotate-90 w-3.5 h-3.5 border rounded-full border-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
        )
       }
      </div>
    </div>
  );
}

export default AboutPage;
