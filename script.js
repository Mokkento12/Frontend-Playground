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

  // Обновляем состояние слайдов и индикаторов
  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentSlide);
    });

    const indicators = document.querySelectorAll(".indicator");
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentSlide);
    });
  }

  // Событие для кнопки "Назад"
  prevButton.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides();
  });

  // Событие для кнопки "Вперед"
  nextButton.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
  });

  // Indicators

  // Создаем индикаторы
  slides.forEach((_, index) => {
    const indicator = document.createElement("div");
    indicator.classList.add("indicator");
    if (index === 0) indicator.classList.add("active");
    indicatorsContainer.appendChild(indicator);

    // Добавляем обработчик клика на индикаторы
    indicator.addEventListener("click", () => {
      currentSlide = index;
      updateSlides();
    });
  });

  // Автопрокрутка

  let autoSlide = setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
  }, 3000);

  // Останавливаем автопрокрутку при наведении
  document.querySelector(".slider").addEventListener("mouseenter", () => {
    clearInterval(autoSlide);
  });

  document.querySelector(".slider").addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlides();
    }, 3000);
  });

  // Показ первого слайда и обновление индикаторов
  updateSlides();

  // Modal

  const modal = document.getElementById("modal");
  const openModalBtn = document.getElementById("open-modal");
  const closeModalBtn = document.getElementById("modal-close");

  openModalBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      modal.style.display = "none";
    }
  });
});
