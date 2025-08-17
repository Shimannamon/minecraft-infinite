fetch("1.21.8.csv")
  .then((response) => response.text())
  .then((csvText) => {
    const tableBody = document.getElementById("tableBody");
    dataLines.forEach((line) => {
      const [name, id, how, status] = line.split(",");
      const row = document.createElement("tr");
      row.innerHTML = `
              <td></td>
              <td>${name}</td>
              <td>${id}</td>
              <td>${how}</td>
              <td>${status}</td>
            `;
      tableBody.appendChild(row);
    });
  })
  .catch((error) => console.error("エラー:", error));
