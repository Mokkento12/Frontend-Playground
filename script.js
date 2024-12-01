document.addEventListener("DOMContentLoaded", () => {
  // Burger menu

  const burger = document.querySelector(".burger-menu");
  const menu = document.querySelector(".menu ul");

  burger.addEventListener("click", () => {
    menu.classList.toggle("active");
    burger.classList.toggle("active");
  });
});
