console.log("formHandler.js подключен");

export function initFormHandler() {
  console.log("initFormHandler вызвана");

  // Функция для валидации имени
  function validateName(name) {
    if (name.trim() === "") {
      return "Имя не может быть пустым";
    }
    if (name.length < 3) {
      return "Имя должно содержать минимум 3 символа";
    }
    return "";
  }

  // Функция для валидации email
  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return "Введите корректный email";
    }
    return "";
  }

  // Функция для валидации пароля
  function validatePassword(password) {
    if (password.length < 6) {
      return "Пароль должен быть не менее 6 символов";
    }
    return "";
  }

  // Получаем форму
  const form = document.getElementById("registrationForm");

  if (!form) {
    console.error("Форма с id 'registrationForm' не найдена!");
    return;
  }

  // Обработка отправки формы
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Предотвращаем стандартную отправку формы

    // Получаем значения из полей
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    // Выполняем валидацию
    const nameError = validateName(nameInput.value);
    const emailError = validateEmail(emailInput.value);
    const passwordError = validatePassword(passwordInput.value);

    // Отображаем ошибки
    document.getElementById("nameError").textContent = nameError || "";
    document.getElementById("emailError").textContent = emailError || "";
    document.getElementById("passwordError").textContent = passwordError || "";

    // Если ошибок нет
    if (!nameError && !emailError && !passwordError) {
      const formData = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      };

      console.log("Форма успешно отправлена!", formData);

      // Отправляем данные на сервер (пока пишем в JSON-файл)
      saveDataToFile(formData);

      // Очищаем форму после успешной отправки
      form.reset();
    }
  });

  // Функция для записи данных в файл (имитация)
  async function saveDataToFile(data) {
    try {
      const response = await fetch("http://localhost:3000/submit-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Данные успешно сохранены!");
        alert("Данные успешно отправлены!");
      } else {
        console.error("Ошибка при сохранении данных", response.statusText);
      }
    } catch (error) {
      console.error("Ошибка сети при сохранении данных", error);
    }
  }
}
