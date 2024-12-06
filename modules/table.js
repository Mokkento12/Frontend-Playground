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
      // Снимаем класс 'sorted' со всех заголовков
      headers.forEach((h) => h.classList.remove("sorted"));

      // Добавляем класс 'sorted' к текущему заголовку
      header.classList.add("sorted");

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
      const matches = rowText.includes(query);

      row.style.display = rowText.includes(query) ? "" : "none";

      if (matches) {
        row.innerHTML = row.innerHTML.replace(
          new RegExp(query, "gi"),
          (match) => `<span class='highlight'>${match}</span>`
        );
      } else {
        row.innerHTML = row.innerHTML.replace(
          /<span class="highlight">|<\/span>/g,
          ""
        );
      }
    });
  });

  // Фильтрация по столбцам

  const filterSelect = document.getElementById("filter-priority");

  filterSelect.addEventListener("change", () => {
    const selectedPriority = filterSelect.value.toLowerCase();

    rows.forEach((row) => {
      const priorityCell = row.querySelector("td:nth-child(3)"); // Третья колонка
      const priority = priorityCell.textContent.toLowerCase();

      row.style.display =
        selectedPriority === "all" || priority === selectedPriority
          ? ""
          : "none";
    });
  });

  // Редактирование строк

  table.addEventListener("dblclick", (event) => {
    const cell = event.target.closest("td");

    if (!cell) return;

    const oldValue = cell.textContent;

    const input = document.createElement("input");

    input.value = oldValue;
    cell.textContent = "";
    cell.appendChild(input);

    input.focus();

    input.addEventListener("blur", () => {
      cell.textContent = input.value;
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        input.blur();
      }
    });
  });

  // Пагинация

  const rowsPerPage = 10;

  let currentPage = 1;

  function renderTable() {
    rows.forEach((row, index) => {
      row.style.display =
        index >= (currentPage - 1) * rowsPerPage &&
        index < currentPage * rowsPerPage
          ? ""
          : "none";
    });
  }

  document.getElementById("next-page").addEventListener("click", () => {
    currentPage++;
    renderTable();
  });

  document.addEventListener("prev-page").addEventListener("click", () => {
    currentPage = Math.max(1, currentPage - 1);

    renderTable();
  });

  renderTable();
}
