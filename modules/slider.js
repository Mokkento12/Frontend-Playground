function initSlider() {
  const slides = document.querySelectorAll(".slide");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const indicatorsContainer = document.querySelector(".slider-indicators");
  let currentSlide = 0;

  if (!slides.length || !prevButton || !nextButton || !indicatorsContainer) {
    return; // Если слайдер не найден
  }

  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentSlide);
    });

    const indicators = document.querySelectorAll(".indicator");
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentSlide);
    });
  }

  prevButton.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides();
  });

  nextButton.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
  });

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

  let autoSlide = setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
  }, 3000);

  document.querySelector(".slider").addEventListener("mouseenter", () => {
    clearInterval(autoSlide);
  });

  document.querySelector(".slider").addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlides();
    }, 3000);
  });

  updateSlides();
}
