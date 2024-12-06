export function initTable() {
  const table = document.querySelector("table");
  const searchInput = document.getElementById("search-input");

  if (!table || !searchInput) {
    return;
  }

  const headers = table.querySelectorAll("th");
  const rows = Array.from(table.querySelectorAll("tbody tr"));

  // Сортировка
  headers.forEach((header) => {
    header.addEventListener("click", () => {
      const sortType = header.dataset.sort;
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

      table.querySelector("tbody").innerHTML = "";
      table.querySelector("tbody").append(...sortedRows);
    });
  });

  // Поиск
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    rows.forEach((row) => {
      const rowText = row.textContent.toLowerCase();
      row.style.display = rowText.includes(query) ? "" : "none";
    });
  });
}
