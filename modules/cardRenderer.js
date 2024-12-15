export async function fetchAndRenderCards(url, containerId) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных: ${response.status}`);
    }
    const data = await response.json();
    const container = document.getElementById(containerId);

    data.slice(0, 6).forEach((post) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");

      cardElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      `;

      container.appendChild(cardElement);

      // Добавляем анимацию появления
      setTimeout(() => {
        cardElement.classList.add("visible");
      }, 100);
    });
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
  }
}
