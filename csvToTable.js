fetch("1.21.8.csv")
  .then((response) => response.text())
  .then((csvText) => {
    const lines = csvText.trim().split("\n");
    const dataLines = lines.slice(1);
    const tableBody = document.getElementById("tableBody");
    dataLines.forEach((line) => {
      const [name, id, how, status] = line.split(",");
      const row = document.createElement("tr");
      const image = `<img src="textures/block/${id}.png" alt="${name}" />`;
      row.innerHTML = `
              <td>${image}</td>
              <td>${name}</td>
              <td>${id}</td>
              <td>${how}</td>
              <td>${status}</td>
            `;
      tableBody.appendChild(row);
    });
  })
  .catch((error) => console.error("エラー:", error));
