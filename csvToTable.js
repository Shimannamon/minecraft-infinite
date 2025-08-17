fetch("1.21.8.csv")
  .then((response) => response.text())
  .then((csvText) => {
    const lines = csvText.trim().split("\n");
    const dataLines = lines.slice(1);
    const tableBody = document.getElementById("tableBody");

    // すべてのアイテム情報を配列に
    const items = dataLines.map((line) => {
      const [name, id, how, status] = line.split(",");
      return { name, id, how, status };
    });

    items.forEach((item) => {
      // 'で囲まれた部分をリンク化
      let howText = item.how.replace(/'([^']+)'/g, (match, p1) => {
        // p1: 'で囲まれた日本語名
        const target = items.find((i) => i.name === p1);
        if (target) {
          return `<a href="#${target.id}"><img src="image/${target.id}.png" alt="${target.name}" />${target.name}</a>`;
        }
        return match; // 該当がなければそのまま
      });

      const row = document.createElement("tr");
      row.id = item.id;
      const imgTag = `<img src="image/${item.id}.png" alt="${item.name}" />`;
      row.innerHTML = `
        <td>${imgTag}</td>
        <td>${item.name}</td>
        <td>${item.id}</td>
        <td>${howText}</td>
        <td>${item.status}</td>
      `;
      tableBody.appendChild(row);
    });
  })
  .catch((error) => console.error("エラー:", error));
