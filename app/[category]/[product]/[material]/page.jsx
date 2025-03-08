import React from "react";
import { SidebarProvider } from "../../components/sidebarProvider";

const Page = () => {
  return (
    <SidebarProvider>
      <article className="material-page w-full break-words flex  min-w-0 justify-center pb-8 ">
        <main className="w-full min-w-0 max-w-6xl px-6 pt-4 md:px-12">
          <div className="nextra-breadcrumb mt-1.5 flex items-center gap-1 overflow-hidden text-sm text-gray-500 dark:text-gray-400 contrast-more:text-current">
            <div
              className="whitespace-nowrap transition-colors min-w-[24px] overflow-hidden text-ellipsis"
              title="Ученикам обучения"
            >
              Ученикам обучения
            </div>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-3.5 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
            <div
              className="whitespace-nowrap transition-colors min-w-[24px] overflow-hidden text-ellipsis"
              title="Часто задаваемые вопросы"
            >
              Часто задаваемые вопросы
            </div>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-3.5 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
            <div
              className="whitespace-nowrap transition-colors font-medium text-gray-700 contrast-more:font-bold contrast-more:text-current dark:text-gray-100 contrast-more:dark:text-current"
              title="Как посмотреть курс?"
            >
              Как посмотреть курс?
            </div>
          </div>

          <h1 class="nx-mt-2 nx-text-4xl nx-font-bold nx-tracking-tight nx-text-slate-900 dark:nx-text-slate-100">Потоки в курсе: Анкета для самостоятельной регистрации учеников в курс</h1>
        </main>
      </article>
    </SidebarProvider>
  );
};

export default Page;
