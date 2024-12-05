function initModal() {
  const modal = document.getElementById("modal");
  const openModalBtn = document.getElementById("open-modal");
  const closeModalBtn = document.getElementById("modal-close");

  if (modal && openModalBtn && closeModalBtn) {
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
  }
}
