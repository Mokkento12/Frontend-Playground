import { initBurgerMenu } from "./modules/burgerMenu.js";
import { initSlider } from "./modules/slider.js";
import { initModal } from "./modules/modal.js";
import { initTable } from "./modules/table.js";

document.addEventListener("DOMContentLoaded", () => {
  initBurgerMenu();
  initSlider();
  initModal();
  initTable();
});
