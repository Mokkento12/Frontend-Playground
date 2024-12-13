import { initBurgerMenu } from "../modules/burgerMenu.js";
import { initSlider } from "../modules/slider.js";
import { initModal } from "../modules/modal.js";
import { initTable } from "../modules/table.js";
import { initFormHandler } from "../modules/formHandler.js";

document.addEventListener("DOMContentLoaded", () => {
  initFormHandler();
  initBurgerMenu();
  initSlider();
  initModal();
  initTable();
});
