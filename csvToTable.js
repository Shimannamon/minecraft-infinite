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

      // 3. 他の日本語名が含まれていたらリンク化
      items.forEach((other) => {
        if (
          other.name &&
          other.id &&
          other.name !== item.name &&
          howText.includes(other.name)
        ) {
          // 正規表現で複数回・部分一致も対応
          const reg = new RegExp(other.name, "g");
          howText = howText.replace(
            reg,
            `<a href="#${other.id}">${other.name}</a>`
          );
        }
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
