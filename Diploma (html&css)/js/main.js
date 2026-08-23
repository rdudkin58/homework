import { betterSlider } from "./better-slider.js";
// ИМПОРТИРУЕМ НАШУ ФУНКЦИЮ ИЗ НОВОГО ФАЙЛА
import { updateTable } from "./timetable-tabs.js";

// Инициализация слайдера (вынесена из DOMContentLoaded, так как она в try/catch)
try {
  betterSlider();
} catch (error) {
  console.error(error);
}

// ОДИН единый обработчик загрузки страницы для всего остального кода
document.addEventListener("DOMContentLoaded", () => {
  
  // 1. КОД С КРОЛЛОМ ШАПКИ
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", () => {
      // Оптимизировано через toggle с условием
      header.classList.toggle("header--scrolled", window.scrollY > 40);
    }, { passive: true }); // passive ускоряет скролл на мобильных устройствах
  }

  // 2. ИНИЦИАЛИЗАЦИЯ И ПАРСИНГ ТАБЛИЦЫ
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
          rowspan: td.hasAttribute("rowspan") ? parseInt(td.getAttribute("rowspan"), 10) : 1,
        };

        if (lesson) {
          cellObj.name = lesson.querySelector(".timetable__lesson-name")?.textContent.trim() || "";
          cellObj.coach = lesson.querySelector(".timetable__lesson-coach")?.textContent.trim() || "";
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

  // 3. ПЕРЕКЛЮЧЕНИЕ ТАБОВ
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
        wrapper.offsetHeight; // Триггер перерисовки
        wrapper.style.animation = "fadeInTable 1s ease forwards";
      }
    });
  });
});
