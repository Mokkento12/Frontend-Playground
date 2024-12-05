import { initBurgerMenu } from "./burgerMenu";

document.addEventListener("DOMContentLoaded", () => {
  initBurgerMenu();
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

  // Открытие модального окна
  openModalBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // Закрытие модального окна
  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Закрытие при клике на затемнение
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Закрытие при нажатии на клавишу Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      modal.style.display = "none";
    }
  });

  // Таблица
  const table = document.querySelector("table");
  const headers = table.querySelectorAll("th");
  const rows = Array.from(table.querySelectorAll("tbody tr"));

  // Сортировка таблицы
  headers.forEach((header) => {
    header.addEventListener("click", () => {
      const sortType = header.dataset.sort; // Определяем колонку
      const sortedRows = [...rows].sort((a, b) => {
        const aText = a
          .querySelector(`td:nth-child(${header.cellIndex + 1})`)
          .textContent.trim();
        const bText = b
          .querySelector(`td:nth-child(${header.cellIndex + 1})`)
          .textContent.trim();

        if (sortType === "name" || sortType === "priority") {
          return aText.localeCompare(bText);
        } else if (sortType === "date") {
          return new Date(aText) - new Date(bText);
        }
      });

      // Удаляем старые строки и вставляем отсортированные
      table.querySelector("tbody").innerHTML = "";
      table.querySelector("tbody").append(...sortedRows);
    });
  });

  // Поиск в таблице
  const searchInput = document.getElementById("search-input");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    rows.forEach((row) => {
      const rowText = row.textContent.toLowerCase();
      row.style.display = rowText.includes(query) ? "" : "none";
    });
  });
});
