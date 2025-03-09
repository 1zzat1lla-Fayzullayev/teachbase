import React from "react";

function AboutPage() {
  const links = [
    { href: "#", text: "Про курсы" },
    { href: "#", text: "Создание и редактирование" },
    { href: "#", text: 'Раздел: "Содержание"' },
    { href: "#", text: "Добавление и редактирование нового раздела" },
    { href: "#", text: "Добавление контента" },
    { href: "#", text: "Редактирование контента" },
    { href: "#", text: "Скачивание контента" },
    { href: "#", text: "Перемещение контента" },
    { href: "#", text: 'Раздел: "Внешний вид"' },
    { href: "#", text: 'Раздел: "Настройки"' },
    { href: "#", text: 'Раздел: "Редакторы"' },
  ];

  return (
    <div className="bg-transparent sticky top-[65px] right-0 w-[250px] h-[calc(100vh-65px)] p-4 hidden xl:block">
      <p className="text-[15px] font-bold">На этой странице</p>
      <ul className="space-y-1">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.href} className="block text-[15px] text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AboutPage;
