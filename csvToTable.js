fetch("1.21.8.csv")
  .then((response) => response.text())
  .then((csvText) => {
    const lines = csvText.trim().split("\n");
    const dataLines = lines.slice(1);

    // 1. 全データを配列に格納
    const items = dataLines.map((line) => {
      const [name, id, how, status] = line.split(",");
      return { name, id, how, status };
    });

    const tableBody = document.getElementById("tableBody");

    // 2. テーブル生成
    items.forEach((item) => {
      let howText = item.how;

      // 他のアイテム名を長い順に並べる
      const sortedItems = [...items]
        .filter((other) => other.name && other.id && other.name !== item.name)
        .sort((a, b) => b.name.length - a.name.length);

      // すべてのアイテム名をまとめて正規表現に
      const names = sortedItems.map((other) =>
        other.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      );
      if (names.length > 0) {
        const reg = new RegExp(names.join("|"), "g");
        howText = howText.replace(reg, (matched) => {
          const other = sortedItems.find((o) => o.name === matched);
          return `<a href="#${other.id}"><img src="image/${other.id}.png" alt="${other.name}" />${other.name}</a>`;
        });
      }

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
