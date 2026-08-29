import { betterSlider } from "./better-slider.js";
import { updateTable } from "./timetable-tabs.js";
import { initAboutTabs } from "./about-tabs.js";
// 👇 1. ИМПОРТИРУЕМ НАШ КЛАСС МОДАЛКИ (БЕЗ ФИГУРНЫХ СКОБОК)
import Modal from "./modal.js";

// Инициализация слайдера (вынесена из DOMContentLoaded, так как она в try/catch)
try {
  betterSlider();
} catch (error) {
  console.error(error);
}

// Создаем экземпляр плагина модальных окон
const modalPlugin = new Modal();

// ОДИН единый обработчик загрузки страницы для всего остального кода
document.addEventListener("DOMContentLoaded", () => {
  initAboutTabs();

  // 🌟 2. КОД ДЛЯ МОДАЛЬНЫХ ОКНО (ОТКРЫТИЕ И ЗАКРЫТИЕ)

  // Слушаем клики по кнопкам ОТКРЫТИЯ
  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-modal-button]");
    if (openBtn) {
      const targetModalId = openBtn.getAttribute("data-modal-button");
      // Открываем окно, передавая ID и саму кнопку (чтобы вытащить ID видео)
      modalPlugin.open(targetModalId, openBtn);
    }
  });

  // Слушаем клики по кнопкам ЗАКРЫТИЯ (крестик или темный оверлей)
  document.addEventListener("click", (e) => {
    const closeBtn = e.target.closest("[data-modal-close]");
    if (closeBtn) {
      // Если кликнули на темный фон, но случайно попали по самому видео-окну — не закрываем
      if (
        closeBtn.classList.contains("modal__overlay") &&
        e.target !== closeBtn
      )
        return;
      modalPlugin.close();
    }
  });

  // Закрытие окна при нажатии на клавишу Escape
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modalPlugin.close();
    }
  });

  // 3. КОД С КРОЛЛОМ ШАПКИ
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener(
      "scroll",
      () => {
        // Оптимизировано через toggle с условием
        header.classList.toggle("header--scrolled", window.scrollY > 40);
      },
      { passive: true },
    ); // passive ускоряет скролл на мобильных устройствах
  }

  // 4. ИНИЦИАЛИЗАЦИЯ И ПАРСИНГ ТАБЛИЦЫ
  const tbody = document.getElementById("timetable-tbody");
  const tabs = document.querySelectorAll(".timetable__tab-btn");
  const wrapper = document.querySelector(".timetable__table-wrapper"); // Вынесли поиск обертки из цикла кликов

  if (!tbody) return;

  const initialAllHtml = tbody.innerHTML;
  const parsedData = [];
  let rowspanCounters = new Array(7).fill(0);

  const originalRows = tbody.querySelectorAll("tr");
  originalRows.forEach((tr) => {
    const timeCell = tr.querySelector(".timetable__cell-time");
    if (!timeCell) return;

    const rowObj = {
      time: timeCell.textContent.trim(),
      cells: new Array(7).fill(null),
    };

    const dayCells = tr.querySelectorAll("td:not(.timetable__cell-time)");
    let htmlCellIndex = 0;

    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      if (rowspanCounters[dayIndex] > 0) {
        rowspanCounters[dayIndex]--;
        continue;
      }

      if (htmlCellIndex < dayCells.length) {
        const td = dayCells[htmlCellIndex];
        const lesson = td.querySelector(".timetable__lesson");

        const cellObj = {
          isExist: true,
          rowspan: td.hasAttribute("rowspan")
            ? parseInt(td.getAttribute("rowspan"), 10)
            : 1,
        };

        if (lesson) {
          cellObj.name =
            lesson
              .querySelector(".timetable__lesson-name")
              ?.textContent.trim() || "";
          cellObj.coach =
            lesson
              .querySelector(".timetable__lesson-coach")
              ?.textContent.trim() || "";
          cellObj.type = lesson.getAttribute("data-type") || "";
        }

        if (cellObj.rowspan > 1) {
          rowspanCounters[dayIndex] = cellObj.rowspan - 1;
        }

        rowObj.cells[dayIndex] = cellObj;
        htmlCellIndex++;
      }
    }

    parsedData.push(rowObj);
  });

  // 5. ПЕРЕКЛЮЧЕНИЕ ТАБОВ
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      if (tab.classList.contains("timetable__tab-btn--active")) return;

      const activeTab = document.querySelector(".timetable__tab-btn--active");
      if (activeTab) {
        activeTab.classList.remove("timetable__tab-btn--active");
      }
      tab.classList.add("timetable__tab-btn--active");

      const filterValue = tab.getAttribute("data-filter");

      // ВЫЗЫВАЕМ ИМПОРТИРОВАННУЮ ФУНКЦИЮ И ПЕРЕДАЕМ В НЕЕ ДАННЫЕ
      updateTable(filterValue, tbody, parsedData, initialAllHtml);

      // --- ПЕРЕЗАПУСК АНИМАЦИИ ДЛЯ ОБЕРТКИ ---
      if (wrapper) {
        wrapper.style.animation = "none";
        wrapper.offsetHeight; // Trigger перерисовки
        wrapper.style.animation = "fadeInTable 1s ease forwards";
      }
    });
  });
});
