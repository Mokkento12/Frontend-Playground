export function initTable() {
  const table = document.querySelector("table");
  const searchInput = document.getElementById("search-input");

  if (!table || !searchInput) {
    return;
  }

  const rows = Array.from(table.querySelectorAll("tbody tr"));

  // Сортировка
  const headers = table.querySelectorAll("th");

  headers.forEach((header) => {
    // Устанавливаем начальный порядок для каждого заголовка
    header.dataset.order = "asc";

    header.addEventListener("click", () => {
      // Снимаем класс 'sorted' со всех заголовков
      headers.forEach((h) => h.classList.remove("sorted"));

      // Добавляем класс 'sorted' к текущему заголовку
      header.classList.add("sorted");

      const sortType = header.dataset.sort;
      const currentOrder = header.dataset.order; // Текущий порядок ('asc' или 'desc')

      // Меняем порядок сортировки
      const newOrder = currentOrder === "asc" ? "desc" : "asc";
      header.dataset.order = newOrder;

      const sortedRows = rows.slice().sort((a, b) => {
        const aText = a
          .querySelector(`td:nth-child(${header.cellIndex + 1})`)
          .textContent.trim();
        const bText = b
          .querySelector(`td:nth-child(${header.cellIndex + 1})`)
          .textContent.trim();

        let comparison = 0;

        if (sortType === "name" || sortType === "priority") {
          comparison = aText.localeCompare(bText);
        } else if (sortType === "date") {
          comparison = new Date(aText) - new Date(bText);
        }

        // Переворачиваем порядок для 'desc'
        return newOrder === "asc" ? comparison : -comparison;
      });

      // Обновляем таблицу
      table.querySelector("tbody").innerHTML = "";
      table.querySelector("tbody").append(...sortedRows);
    });
  });

  // Поиск
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();

    rows.forEach((row) => {
      let matchFound = false;

      // Удаляем все подсветки из ячеек
      const cells = row.querySelectorAll("td");
      cells.forEach((cell) => {
        // Удаляем старые подсветки
        cell.innerHTML = cell.textContent;

        // Если есть поисковый запрос, ищем совпадения
        if (query) {
          const cellText = cell.textContent.toLowerCase();

          if (cellText.includes(query)) {
            matchFound = true;

            // Подсветка совпадений
            const regex = new RegExp(`(${query})`, "gi");
            cell.innerHTML = cell.textContent.replace(
              regex,
              `<span class="highlight">$1</span>`
            );
          }
        }
      });

      // Показываем или скрываем строку в зависимости от наличия совпадений
      row.style.display = matchFound || !query ? "" : "none";
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
