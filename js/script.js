import { initBurgerMenu } from "../modules/burgerMenu.js";
import { initSlider } from "../modules/slider.js";
import { initModal } from "../modules/modal.js";
import { initTable } from "../modules/table.js";
import { initFormHandler } from "../modules/formHandler.js";
import { fetchAndRenderCards } from "../modules/cardRenderer.js";

document.addEventListener("DOMContentLoaded", () => {
  fetchAndRenderCards(
    "https://jsonplaceholder.typicode.com/posts",
    "cards-container"
  );
  initFormHandler();
  initBurgerMenu();
  initSlider();
  initModal();
  initTable();
});
