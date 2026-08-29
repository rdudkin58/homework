export default class Modal {
  constructor(config) {
    const defaultConfig = {
      PAGE_BODY_NO_SCROLL: "page__body--no-scroll",
    };
    this.config = Object.assign(defaultConfig, config);
    this.body = document.body; // Гарантированный и быстрый доступ к тегу <body>
    this.modal = null; // Сюда запишется текущее открытое окно
    this.speed = 300; // Скорость анимации по умолчанию (в мс)
    this.isOpen = false;
  }

  // 1. МЕТОД ОТКРЫТИЯ МОДАЛЬНОГО ОКНА
  open(modalId, buttonElement) {
    this.modal = document.getElementById(modalId);
    if (!this.modal) {
      console.error(`Модальное окно с id="${modalId}" не найдено в HTML!`);
      return;
    }

    // Считываем скорость анимации из атрибута кнопки data-modal-speed
    this.speed =
      parseInt(buttonElement.getAttribute("data-modal-speed"), 10) || 300;
    // Динамически передаем эту скорость в CSS
    this.modal.style.transitionDuration = `${this.speed}ms`;

    // Ищем контейнер для видео внутри открытого окна
    const videoContainer = this.modal.querySelector(".modal__content");
    const videoId = buttonElement.getAttribute("data-modal-src");

// 🔍 ЛОГ ДЛЯ ПРОВЕРКИ (Откройте вкладку "Консоль" в браузере при клике)
console.log("Считанный ID видео:", videoId); 

if (videoContainer && videoId) {
  // Внимание на косые кавычки ` ` и синтаксис ${}
  const embedUrl = `https://youtube.com/embed/${videoId.trim()}?autoplay=1&rel=0`;
  
  console.log("Итоговая ссылка для iframe:", embedUrl);

  videoContainer.innerHTML = `
    <iframe 
      src="${embedUrl}" 
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      allowfullscreen>
    </iframe>`;
} else {
  console.error("Контейнер или ID видео не найдены!", { videoContainer, videoId });
}

    // Активируем окно и блокируем прокрутку страницы
    this.modal.classList.add("is-open");
    this.modal.setAttribute("aria-hidden", "false");
    this.disableScroll();
    this.isOpen = true;
  }

  // 2. МЕТОД ЗАКРЫТИЯ МОДАЛЬНОГО ОКНА
  close() {
    if (!this.modal || !this.isOpen) return;

    // Убираем класс видимости с главного контейнера модалки
    this.modal.classList.remove("is-open");
    this.modal.setAttribute("aria-hidden", "true");
    this.enableScroll();
    this.isOpen = false;

    const videoContainer = this.modal.querySelector(".modal__content");
    if (videoContainer) {
      // Ждем завершения CSS-анимации затухания окна, затем полностью удаляем iframe,
      // чтобы видео гарантированно выключилось и звук не пел на фоне.
      setTimeout(() => {
        videoContainer.innerHTML = "";
      }, this.speed);
    }
  }

  // 3. БЛОКИРОВКА СКРОЛЛА СТРАНИЦЫ (БЕЗ ДЕРГАНИЯ ВЕРСТКИ)
  disableScroll() {
    // Вычисляем текущую ширину системной полосы прокрутки браузера
    const scrollWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // Компенсируем исчезновение скроллбара внутренним отступом справа у body
    this.body.style.paddingRight = `${scrollWidth}px`;
    this.body.style.overflow = "hidden";

    // Фикс для мобильного Safari (iOS)
    this.body.style.touchAction = "none";
  }

  // 4. ВКЛЮЧЕНИЕ СКРОЛЛА СТРАНИЦЫ ОБРАТНО
  enableScroll() {
    // Возвращаем исходные стили body
    this.body.style.paddingRight = "";
    this.body.style.overflow = "";
    this.body.style.touchAction = "";
  }
}
