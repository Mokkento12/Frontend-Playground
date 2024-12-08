export function initTable() {
  const table = document.querySelector("table");
  const searchInput = document.getElementById("search-input");
  const taskForm = document.getElementById("task-form");
  const taskNameInput = document.getElementById("task-name");
  const taskPrioritySelect = document.getElementById("task-priority");
  const taskDateInput = document.getElementById("task-date");
  const tableBody = document.querySelector("tbody");
  const prevPageButton = document.getElementById("prev-page");
  const nextPageButton = document.getElementById("next-page");
  const paginationInfo = document.getElementById("pagination-info"); // элемент для отображения информации о пагинации

  if (!table || !taskForm || !prevPageButton || !nextPageButton) {
    console.error("Missing necessary elements for table initialization.");
    return;
  }

  // Задачи
  let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // загружаем задачи из localStorage
  let currentPage = 1; // текущая страница
  const tasksPerPage = 3; // количество задач на страницу

  // Если задач нет в localStorage, добавляем примерные данные.
  if (tasks.length === 0) {
    tasks = [
      { name: "Купить продукты", priority: "Средний", date: "2024-12-10" },
      { name: "Подготовить отчет", priority: "Высокий", date: "2024-12-12" },
      { name: "Позвонить другу", priority: "Низкий", date: "2024-12-15" },
    ];
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  /**
   * Функция для отображения задач на текущей странице.
   */
  function renderTasks() {
    tableBody.innerHTML = ""; // очищаем тело таблицы

    const startIndex = (currentPage - 1) * tasksPerPage;
    const endIndex = startIndex + tasksPerPage;

    const tasksToDisplay = tasks.slice(startIndex, endIndex);
    tasksToDisplay.forEach((task, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${task.name}</td>
      <td>${task.priority}</td>
      <td>${task.date}</td>
      <td>
        <button class="delete-task" data-index="${startIndex + index}">
          Удалить
        </button>
      </td>
    `;
      tableBody.appendChild(row);
    });

    // Обновляем состояние кнопок пагинации
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = endIndex >= tasks.length;

    // Обновляем текст информации о пагинации
    const totalPages = Math.ceil(tasks.length / tasksPerPage);
    paginationInfo.textContent = `Страница ${currentPage} из ${totalPages}`;
  }

  /**
   * Слушатель для кнопок "Удалить".
   */
  tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-task")) {
      const taskIndex = parseInt(e.target.dataset.index, 10);
      tasks.splice(taskIndex, 1); // Удаляем задачу из массива
      localStorage.setItem("tasks", JSON.stringify(tasks)); // Сохраняем обновления
      renderTasks(); // Перерисовываем таблицу
    }
  });

  /**
   * Функция для добавления новой задачи.
   */
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newTask = {
      name: taskNameInput.value.trim(),
      priority:
        taskPrioritySelect.options[taskPrioritySelect.selectedIndex].text,
      date: taskDateInput.value,
    };

    if (newTask.name && newTask.date) {
      tasks.push(newTask); // добавляем задачу в массив
      taskForm.reset(); // сбрасываем форму

      // Сохраняем обновленный список задач в localStorage
      localStorage.setItem("tasks", JSON.stringify(tasks));

      if (currentPage === Math.ceil(tasks.length / tasksPerPage)) {
        // если новая задача на текущей последней странице, показываем ее
        renderTasks();
      } else {
        currentPage = Math.ceil(tasks.length / tasksPerPage); // переключаемся на последнюю страницу
        renderTasks();
      }
    } else {
      alert("Пожалуйста, заполните все поля перед добавлением задачи.");
    }
  });

  /**
   * Логика кнопки "Назад".
   */
  prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderTasks();
    }
  });

  /**
   * Логика кнопки "Вперед".
   */
  nextPageButton.addEventListener("click", () => {
    const totalPages = Math.ceil(tasks.length / tasksPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderTasks();
    }
  });

  // Сортировка
  const headers = table.querySelectorAll("th");

  headers.forEach((header) => {
    // Устанавливаем начальный порядок для каждого заголовка
    header.dataset.order = "asc";

    header.addEventListener("click", () => {
      // Получаем актуальные строки из таблицы
      const rows = Array.from(tableBody.querySelectorAll("tr"));

      // Снимаем класс 'sorted' со всех заголовков
      headers.forEach((h) => h.classList.remove("sorted"));

      // Добавляем класс 'sorted' к текущему заголовку
      header.classList.add("sorted");

      // Тип сортировки из атрибута data-sort
      const sortType = header.dataset.sort;
      const currentOrder = header.dataset.order; // Текущий порядок ('asc' или 'desc')

      // Меняем порядок сортировки
      const newOrder = currentOrder === "asc" ? "desc" : "asc";
      header.dataset.order = newOrder;

      const sortedRows = rows.sort((a, b) => {
        const aText = a
          .querySelector(`td:nth-child(${header.cellIndex + 1})`)
          .textContent.trim();
        const bText = b
          .querySelector(`td:nth-child(${header.cellIndex + 1})`)
          .textContent.trim();

        let comparison = 0;

        // Сравнение в зависимости от типа данных
        if (sortType === "name" || sortType === "priority") {
          comparison = aText.localeCompare(bText);
        } else if (sortType === "date") {
          comparison = new Date(aText) - new Date(bText);
        }

        // Переворачиваем порядок для 'desc'
        return newOrder === "asc" ? comparison : -comparison;
      });

      // Обновляем таблицу
      tableBody.innerHTML = "";
      tableBody.append(...sortedRows);
    });
  });

  // Поиск
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    const rows = Array.from(tableBody.querySelectorAll("tr")); // Определяем строки

    rows.forEach((row) => {
      let matchFound = false;
      const cells = row.querySelectorAll("td");

      cells.forEach((cell) => {
        cell.innerHTML = cell.textContent; // Удаляем старые подсветки

        if (query) {
          const cellText = cell.textContent.toLowerCase();
          if (cellText.includes(query)) {
            matchFound = true;

            const regex = new RegExp(`(${query})`, "gi");
            cell.innerHTML = cellText.replace(
              regex,
              '<span class="highlight">$1</span>'
            );
          }
        }
      });

      row.style.display = matchFound || !query ? "" : "none";
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
      cell.textContent = input.value.trim() || oldValue;
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        input.blur();
      }
    });
  });

  // Фильтрация по столбцам

  const filterSelect = document.getElementById("filter-priority");

  filterSelect.addEventListener("change", () => {
    const selectedPriority = filterSelect.value;
    const rows = Array.from(tableBody.querySelectorAll("tr"));

    rows.forEach((row) => {
      const priorityCell = row.querySelector("td:nth-child(2)");
      const priorityText = priorityCell.textContent.toLowerCase();

      const priorityValue =
        priorityText === "высокий"
          ? "high"
          : priorityText === "средний"
          ? "medium"
          : priorityText === "низкий"
          ? "low"
          : "all";

      row.style.display =
        selectedPriority === "all" || priorityValue === selectedPriority
          ? ""
          : "none";
    });
  });

  // Инициализация таблицы.
  function initialize() {
    renderTasks(); // сразу отображаем задачи при загрузке страницы
  }

  initialize();
}
