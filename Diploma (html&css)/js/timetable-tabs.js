// timetable-tabs.js

/**
 * Умная отрисовка сетки расписания
 * @param {string} filter - Значение фильтра (all, gym, cardio и т.д.)
 * @param {HTMLElement} tbody - Контейнер таблицы
 * @param {Array} parsedData - Массив распарсенных данных
 * @param {string} initialAllHtml - Исходный HTML-код таблицы для фильтра "all"
 */
export function updateTable(filter, tbody, parsedData, initialAllHtml) {
  // Если выбран "all", возвращаем родной HTML с rowspan-ами из верстки
  if (filter === "all") {
    tbody.innerHTML = initialAllHtml;
    return;
  }

  tbody.innerHTML = "";

  // Отслеживаем rowspan для отрисовки изолированных табов
  let activeRowspanCounters = new Array(7).fill(0);

  parsedData.forEach((row) => {
    const tr = document.createElement("tr");

    // Добавляем время
    const timeTd = document.createElement("td");
    timeTd.className = "timetable__cell-time";
    timeTd.textContent = row.time;
    tr.appendChild(timeTd);

    // Идем строго по 7 дням недели (от 0 до 6)
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      if (activeRowspanCounters[dayIndex] > 0) {
        activeRowspanCounters[dayIndex]--;
        continue;
      }

      const cellData = row.cells[dayIndex];
      const td = document.createElement("td");

      // Проверяем, подходит ли тренировка под фильтр
      const isMatch = cellData && cellData.name && cellData.type === filter;

      if (isMatch) {
        if (cellData.rowspan > 1) {
          td.setAttribute("rowspan", cellData.rowspan);
          activeRowspanCounters[dayIndex] = cellData.rowspan - 1;
        }

        td.innerHTML = `
          <div class="timetable__lesson" data-type="${cellData.type}">
            <span class="timetable__lesson-name">${cellData.name}</span>
            <span class="timetable__lesson-coach">${cellData.coach}</span>
          </div>
        `;
      }

      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  });
}
