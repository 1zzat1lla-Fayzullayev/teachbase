import React from "react";
import Wrapper from "../layout/wrapper";
import Link from "next/link";

function Managers() {
  return (
    <>
      <Wrapper>
        <div className="px-5 flex flex-col items-center my-10">
          <div className="max-w-6xl w-full flex flex-col gap-8">
           <div className="cnts w-full">
           <div className="cr flex flexc-col">
              <h4>
                <Link className="text-2xl" href="#">
                Категория 1
                </Link>
              </h4>
            </div>
            <div className="content flex flex-row flex-wrap gap-4 mt-2">
              <div className="carde max-w-[370px] border rounded-2xl flex flex-col dark:text-gray-100 bg-white dark:bg-[#111] drop-shadow-lg p-5 border-gray-200">
                <h5 className="text-xl font-light mb-5">Продукт 01</h5>
                <p className="text-sm leading-normal mb-5">
                  Одна из базовых функций платформы - возможность создавать и
                  запускать обучение по курсам. Которые могут состоять
                  практически из любого вида контента: аудио, видео, документы,
                  опросы, SCORM, html-страницы, встроенные материалы из
                  сторонних сервисов: Youtube, Vimeo-видео, Google Forms, Google
                  Docs, LearningApps, H5P и многое-многое другое. А для оценки
                  знаний использовать встроенные инструменты - конструктор
                  тестов и заданий.
                </p>
                <Link
                  className="uppercase mt-auto text-blue-400 font-bold hover:opacity-70"
                  href="#"
                >
                  22 статьи
                </Link>
              </div>
            </div>
           </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}

export default Managers;
