export const betterSlider = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const sliderElement = document.querySelector(".better__slider");
    if (!sliderElement) return;

    const dots = document.querySelectorAll(".better__slider-dot");
    const currentCircle = document.querySelector(".better__slider-current");
    const navContainer = document.querySelector(".better__navigation");

    const swiper = new Swiper(sliderElement, {
      wrapperClass: "better__slides",
      slideClass: "better__slide",
      direction: "vertical",
      slidesPerView: "auto",
      centeredSlides: true,
      loop: true,
      initialSlide: 2, // По умолчанию выбран третий слайд

      grabCursor: true,
      simulateTouch: true,
      // mousewheel: {
      //   releaseOnEdges: true,
      // },

      on: {
        slideChange: function () {
          const activeIndex = this.realIndex; // 0, 1, 2 или 3

          // Обновляем цифру внутри круга
          if (currentCircle) {
            currentCircle.textContent = activeIndex + 1;
          }

          // Управляем видимостью точек
          dots.forEach((dot, index) => {
            if (index === activeIndex) {
              dot.classList.add("better__slider-dot--hidden");
            } else {
              dot.classList.remove("better__slider-dot--hidden");
            }
          });

          // Рассчитываем положение круга
          if (currentCircle && navContainer && dots[activeIndex]) {
            // Берем координату центра текущей точки относительно контейнера навигации
            const dotTop = dots[activeIndex].offsetTop;
            const dotHeight = dots[activeIndex].offsetHeight;
            const circleHeight = currentCircle.offsetHeight;

            // Вычисляем top-координату, чтобы центр круга совпал с центром точки
            const translateY = dotTop + dotHeight / 2 - circleHeight / 2;

            // Плавно передвигаем круг на нужную точку
            currentCircle.style.transform = `translateY(${translateY}px)`;
          }
        },
      },
    });

    // Клик по точкам для переключения слайдов
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const targetIndex = parseInt(dot.getAttribute("data-index"), 10);
        swiper.slideToLoop(targetIndex);
      });
    });
  });
};
