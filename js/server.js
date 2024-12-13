const fs = require("fs");
const path = require("path");
const http = require("http");

// Путь к файлу для сохранения контактов
const dataFilePath = path.join(__dirname, "data", "contacts.json");

// Проверка и создание директории, если она не существует
const dirPath = path.join(__dirname, "data");
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const server = http.createServer((req, res) => {
  // Добавляем заголовки для разрешения кросс-доменных запросов
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/submit-contact") {
    let body = "";

    // Считываем данные из тела запроса
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const contact = JSON.parse(body);

        // Читаем текущие данные из файла
        fs.readFile(dataFilePath, "utf8", (err, data) => {
          if (err) {
            if (err.code === "ENOENT") {
              // Если файл не существует, создаём новый
              fs.writeFileSync(
                dataFilePath,
                JSON.stringify([contact], null, 2)
              );
            } else {
              throw err;
            }
          } else {
            const contacts = JSON.parse(data);
            contacts.push(contact);

            // Записываем обновленные данные в файл
            fs.writeFileSync(dataFilePath, JSON.stringify(contacts, null, 2));
          }

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Контакт сохранён!" }));
        });
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ message: "Ошибка сервера", error: err.message })
        );
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Маршрут не найден" }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
