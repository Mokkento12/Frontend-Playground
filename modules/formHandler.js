// formHandler.js

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
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Простая проверка email
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
    event.preventDefault(); // Предотвращаем отправку формы

    // Получаем значения из полей ввода
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    // Выполняем валидацию
    const nameError = validateName(nameInput.value);
    const emailError = validateEmail(emailInput.value);
    const passwordError = validatePassword(passwordInput.value);

    // Отображаем ошибки (или очищаем их, если ошибок нет)
    document.getElementById("nameError").textContent = nameError || "";
    document.getElementById("emailError").textContent = emailError || "";
    document.getElementById("passwordError").textContent = passwordError || "";

    // Если ошибок нет, выводим сообщение об успешной отправке
    if (!nameError && !emailError && !passwordError) {
      console.log("Форма успешно отправлена!");
      alert("Форма успешно отправлена!");
    }
  });
}
