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
  let currentIndex = 0;

  const showSlide = (index) => {
    slides.forEach((slide) => slide.classList.remove("active"));

    slides[index].classList.add("active");
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  };

  document.getElementById("next").addEventListener("click", nextSlide);
  document.getElementById("prev").addEventListener("click", prevSlide);

  showSlide(currentIndex);
});
