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
});
