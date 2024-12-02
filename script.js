document.addEventListener("DOMContentLoaded", () => {
  // Burger menu

  const burger = document.querySelector(".burger-menu");
  const menu = document.querySelector(".menu ul");

  burger.addEventListener("click", () => {
    menu.classList.toggle("active");
    burger.classList.toggle("active");
  });

  // Slider

  const slides = document.querySelectorAll(".slide");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const indicatorsContainer = document.querySelector(".slider-indicators");
  let currentSlide = 0; // Индекс текущего слайда

  // Функция для показа текущего слайда
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  // Событие для кнопки "Назад"
  prevButton.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  // Событие для кнопки "Вперед"
  nextButton.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  // Показ первого слайда при загрузке
  showSlide(currentSlide);

  // Indicators

  slides.forEach((_, index) => {
    const indicator = document.createElement("div");

    indicator.classList.add("indicator");

    if (index === 0) indicator.classList.add("active");

    indicatorsContainer.appendChild(indicator);

    indicator.addEventListener("click", () => {
      currentSlide = index;
      updateSlides();
    });
  });

  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentSlide);
    });

    const indicators = document.querySelectorAll(".indicator");
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentSlide);
    });
  }
});
