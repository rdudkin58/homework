export function initAboutTabs() {
  const buttons = document.querySelectorAll(".about__tab-btn");
  const contents = document.querySelectorAll(".about__tab-content");

  if (buttons.length === 0 || contents.length === 0) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Игнорируем клик, если таб уже активен
      if (btn.classList.contains("about__tab-btn--active")) return;

      const targetId = btn.getAttribute("data-tab");
      const targetContent = document.getElementById(`about-${targetId}`);

      if (!targetContent) return;

      // 1. Деактивируем прошлые кнопки и контент
      buttons.forEach((b) => b.classList.remove("about__tab-btn--active"));
      contents.forEach((c) => {
        c.classList.remove(
          "about__tab-content--active",
          "about__tab-content--animate",
        );
      });

      // 2. Включаем текущую кнопку
      btn.classList.add("about__tab-btn--active");

      // 3. Включаем текущий контент (display: block)
      targetContent.classList.add("about__tab-content--active");

      // 4. Запускаем анимацию плавного появления через минимальную задержку
      setTimeout(() => {
        targetContent.classList.add("about__tab-content--animate");
      }, 20);
    });
  });
}
