export function fetchAndRenderCards(url, containerId) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const container = document.getElementById(containerId);

      data.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");

        cardElement.innerHTML = `
  <img src="${card.image || "images/placeholder.jpg"}" alt="${card.title}">
  <h3>${card.title}</h3>
  <p>${card.description}</p>
`;

        container.appendChild(cardElement);
      });
    })
    .catch((error) => console.error("Ошибка при загрузке данных:", error));
}
